package com.project15.server.member.controller;

import com.project15.server.member.dto.EmailDto;
import com.project15.server.member.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmailController {

    private final EmailService emailService;

    @GetMapping("/{email}/send-code")
    public ResponseEntity<String> sendEmailPath(@PathVariable ("email") String email) throws MessagingException {
        emailService.sendEmail(email);
        return ResponseEntity.ok("이메일을 확인하세요");
    }

    @PostMapping("/{email}/code")
    public ResponseEntity<String> sendEmailAndCode(@PathVariable ("email") String email, @RequestParam ("code")String code) throws NoSuchAlgorithmException {
        if (emailService.verifyEmailCode(email, code)) {
            return ResponseEntity.ok("이메일 인증 성공");
        }
        return ResponseEntity.notFound().build();
    }
}
