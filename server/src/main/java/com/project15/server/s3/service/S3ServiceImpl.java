package com.project15.server.s3.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.project15.server.exception.ExceptionCode;
import com.project15.server.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucketName}")
    private String bucketName;

    public String uploadFileToS3(MultipartFile image) {
        if(image == null) {
            return "";
        }

        String originName = image.getOriginalFilename();
        String imageType = originName.substring(originName.lastIndexOf("."));
        String changedName = changedFileName(originName);

        //업로드되는 이미지의 MIME 유형 설정
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("image/" + imageType);

        try {
            PutObjectResult putObjectResult = amazonS3 //Amazon S3의 putObject 메서드를 호출하여 이미지를 업로드
                    .putObject(
                            new PutObjectRequest(bucketName, changedName, image.getInputStream(), objectMetadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead) //업로드된 이미지를 공개 읽기 권한을 가지도록 설정
                    );
        } catch (IOException ioe) {
            throw new GlobalException(ExceptionCode.IMAGE_UPLOAD_FAIL);
        }

        return amazonS3.getUrl(bucketName, changedName).toString();
    }

    public void deleteFileAtS3(String url) {
        if(url != null) {
            try {
                amazonS3.deleteObject(new DeleteObjectRequest(bucketName, url));
            } catch (AmazonServiceException ase) {
                ase.printStackTrace();
            }
        }
    }

    private String changedFileName(String originName) {
        String random = UUID.randomUUID().toString();
        return random + originName;
    }
}
