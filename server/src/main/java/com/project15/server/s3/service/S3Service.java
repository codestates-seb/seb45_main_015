package com.project15.server.s3.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface S3Service {
    String uploadFileToS3(MultipartFile file);
}
