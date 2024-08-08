import React, { useState, useEffect } from "react";
import { storage, db } from "src/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import './ProfileUploader.css';
import api from "src/store/apps/airplane/api.js";

const ProfileUploader = () => {

  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setUserCode(userInfo.userCode);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image && userCode) {
      setLoading(true);
      const imageRef = ref(storage, `profile_images/${userCode}`);
      try {
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        setProfileImageUrl(imageUrl); // 이미지 URL 저장

        await addDoc(collection(db, "users"), {
          userCode,
          profileImageUrl: imageUrl,
        });

        alert("프로필 사진 업로드 및 저장 완료!");
      } catch (error) {
        console.error("업로드 중 오류 발생:", error);
        alert("업로드 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("이미지를 입력하세요.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userCode) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userCode", "==", userCode));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
        } else {
        }
      }
    };

    fetchData();
  }, [userCode]);

  useEffect(() => {
    const sendProfileImageToServer = async () => {
      if (profileImageUrl) {
        api.post('/api/v1/profile/img', {
          profileImageUrl : profileImageUrl,
          userCode : userInfo.userCode
        })
            .then(res => {
              setTimeout(() => {
                navigate('/profile');
              }, 500);
            })
            .catch(error => {
              console.log(error);
              alert('다시 시도해주세요');
            });
      }
    };

    sendProfileImageToServer();
  }, [profileImageUrl]);

  return (
      <Form>
        <FormGroup>
          <Label for="profileImage">프로필 이미지</Label>
          <Input type="file" id="profileImage" onChange={handleImageChange} />
        </FormGroup>
        <Button color="primary" onClick={handleUpload} disabled={loading}>
          {loading ? <Spinner size="sm" /> : "프로필 사진 업로드"}
        </Button>
        {profileImageUrl && (
            <div className="profile-image-preview">
              <img src={profileImageUrl} alt="프로필 이미지" />
            </div>
        )}
      </Form>
  );
};

export default ProfileUploader;
