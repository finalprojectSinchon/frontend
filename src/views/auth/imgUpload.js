import React, { useState, useEffect } from "react";
import { storage, db } from "../../firebase"; // Firebase 설정에 맞게 수정해주세요
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import api from "../../store/apps/airplane/api";
import { useNavigate } from "react-router-dom";

const ProfileUploader = () => {

    const userInfo = useSelector((state) => state.userInfo);

    const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const handleImageChange = (e) => {
    setUserCode(userInfo.userCode);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  const handleUpload = async () => {
    if (image && userCode) {
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
      }
    } else {
      alert("이미지와 사용자 코드를 입력하세요.");
    }
  };

  // 사용자 코드(userCode)를 기준으로 Firestore에서 데이터를 꺼내는 예시
  useEffect(() => {
    const fetchData = async () => {
      if (userCode) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("userCode", "==", userCode));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          console.log("사용자 데이터:", userData);
        } else {
          console.log("해당 사용자를 찾을 수 없습니다.");
        }
      }
    };

    fetchData();
  }, [userCode]);

  useEffect(() => {
    const sendProfileImageToServer = async () => {
      if (profileImageUrl) {
        api.post('/api/v1/profile/img',{ 
            profileImageUrl : profileImageUrl,
            userCode : userInfo.userCode })
        .then(res => {
          setTimeout(() => {
            navigate('/profile');
          },500)
        })
        .catch(error => {
            console.log(error);
            alert('다시 시도해주세요')
        })
      }
    };
  
    sendProfileImageToServer();
  }, [profileImageUrl]);

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Profile Picture</button>

      {/* 이미지 URL 표시 */}
      {profileImageUrl && (
        <img src={profileImageUrl} alt="프로필 이미지" style={{ maxWidth: "200px" }} />
      )}
    </div>
  );
};

export default ProfileUploader;
