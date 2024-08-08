import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { Button } from 'reactstrap'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from 'src/firebase.js'
import { addDoc, collection } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from 'src/store/apps/airplane/api.js'

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    imgContainer: {
        position: 'relative',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    img: {
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
        width: '300px',
        height: '300px',
    },
    dialogPaper: {
        width: '80%',
        maxWidth: '600px',
        height: '80%',
        maxHeight: '600px',
    },
    buttonContainer: {
        marginTop: '25px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
}

function Transition(props) {
    return <Slide direction="up" {...props} />
}

function ImgDialog(props) {
    const { classes, img, onClose } = props

    const [userCode, setUserCode] = useState()
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const userInfo = useSelector((state) => state.userInfo)
    const navigate = useNavigate()

    useEffect(() => {
        setUserCode(userInfo.userCode)
    }, [userInfo.userCode])

    const convertBlobToFile = async (blobUrl, fileName) => {
        const response = await fetch(blobUrl)
        const blob = await response.blob()
        return new File([blob], fileName, { type: blob.type })
    }

    const handleUpload = async () => {

        // Ensure `img` is a Blob URL and convert it to File object
        if (img && userCode) {
            setLoading(true)

            const file = await convertBlobToFile(img, 'profile-image.png')
            const imageRef = ref(storage, `profile_images/${userCode}`)

            try {
                await uploadBytes(imageRef, file)
                const imageUrl = await getDownloadURL(imageRef)
                setProfileImageUrl(imageUrl) // Set profileImageUrl here

                // Save image URL in Firestore
                await addDoc(collection(db, 'users'), {
                    userCode,
                    profileImageUrl: imageUrl,
                })

                alert('프로필 사진 업로드 및 저장 완료!')
            } catch (error) {
                console.error('업로드 중 오류 발생:', error)
                alert('업로드 중 오류가 발생했습니다.')
            } finally {
                setLoading(false)
            }
        } else {
            alert('이미지와 사용자 코드를 입력하세요.')
        }
    }

    useEffect(() => {
        const sendProfileImageToServer = async () => {
            if (profileImageUrl && userCode) {
                try {
                    await api.post('/api/v1/profile/img', {
                        profileImageUrl: profileImageUrl,
                        userCode: userCode,
                    })
                    setTimeout(() => {
                        navigate('/profile')
                    }, 500)
                } catch (error) {
                    console.log(error)
                    alert('다시 시도해주세요')
                }
            }
        }

        sendProfileImageToServer()
    }, [profileImageUrl, userCode, navigate]) // Execute this useEffect when profileImageUrl or userCode changes

    return (
        <Dialog
            open={!!img}
            onClose={onClose}
            TransitionComponent={Transition}
            PaperProps={{ className: classes.dialogPaper }}
        >
            <div>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={onClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.flex}
                        >
                            프로필 사진
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.imgContainer}>
                    <img src={img} alt="Cropped" className={classes.img} />
                    <div className={classes.buttonContainer}>
                        <Button color="primary" onClick={handleUpload} disabled={loading}>
                            {loading ? '업로드 중...' : '저장하기'}
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default withStyles(styles)(ImgDialog)
