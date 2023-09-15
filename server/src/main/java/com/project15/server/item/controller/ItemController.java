package com.project15.server.item.controller;

import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.item.mapper.ItemMapper;
import com.project15.server.item.service.ItemServiceImpl;
import com.project15.server.utils.PageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/items")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class ItemController {

    private final ItemMapper itemMapper;

    private final ItemServiceImpl itemService;

    //경매 물품(이미제 제외) 등록
    @PostMapping
    public ResponseEntity postItem(@RequestBody @Valid ItemDto.PostDto postDto) {
        Item item = itemMapper.postDtoToItem(postDto);

        ItemDto.ResponseDto responseDto = itemService.createItem(item, postDto.getEnd_time());

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    //경매 물품의 이미지 등록
    @PostMapping("/{item-id}/images")
    public HttpStatus postImage(@PathVariable("item-id") Long itemId,
                                @RequestPart(value = "image", required = false) List<MultipartFile> images) {

        itemService.createImage(itemId, images);

        return HttpStatus.CREATED;
    }

    //경매 물품 상세 페이지
    @GetMapping("/{item-id}")
    public ResponseEntity getItem(@PathVariable("item-id") Long itemId,
                                  @RequestBody PageDto pageDto) {
        ItemDto.ResponseDto responseDto = itemService.findItem(itemId, pageDto.getWatcher_id());

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    //경매 물품 전체 목록
    @GetMapping
    public ResponseEntity getItems(@RequestBody PageDto pageDto) {
        ItemDto.MultiResponseDto multiResponseDto = itemService
                .findItems(pageDto.getPage_number(), pageDto.getPage_size(), pageDto.getWatcher_id());

        return new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
    }

    //경매 물품 카테고리별 목록
    @GetMapping("/categories")
    public ResponseEntity getItemsByCategory(@RequestBody PageDto pageDto) {
        ItemDto.MultiResponseDto multiResponseDto = itemService
                .findItemsByCategory(pageDto.getPage_number(), pageDto.getPage_size(),
                        pageDto.getCategory_id(), pageDto.getWatcher_id());

        return new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
    }

    //거래 물품들의 제목에 입력한 키워드가 포함되는 물품 검색
    @GetMapping("/search")
    public ResponseEntity getItemsByKeywords(@RequestBody PageDto pageDto) {
        ItemDto.MultiResponseDto multiResponseDto = itemService
                .findItemsByKeyword(pageDto.getPage_number(), pageDto.getPage_size(),
                        pageDto.getKeyword(), pageDto.getWatcher_id());

        return new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
    }

    //마이페이지의 나의 거래 상태별 목록
    @GetMapping("/status")
    public ResponseEntity getItemsByStatus(@RequestBody PageDto pageDto) {
        ItemDto.MultiResponseDto multiResponseDto = itemService
                .findItemsByStatus(pageDto.getPage_number(), pageDto.getPage_size(),
                        pageDto.getItem_status(), pageDto.getSeller_id());

        return new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
    }

    //물품 등록 후 5분 이내 물품 정보 수정
    //추가한 이미지는 postImage 요청, 삭제된 이미지는 deleteImage 요청
    @PatchMapping
    public HttpStatus patchItem(@RequestBody ItemDto.PatchDto patchDto) {
        itemService.updateItem(patchDto, patchDto.getItem_id());

        return HttpStatus.OK;
    }

    //물품 정보 수정 후 업로드 됐던 이미지 중 삭제할 이미지의 삭제 요청
    @DeleteMapping("/images")
    public HttpStatus deleteImage(@RequestBody @Valid ItemDto.DeleteImageDto deleteDto) {
        itemService.removeImage(deleteDto.getItem_id(), deleteDto.getSeller_id(), deleteDto.getDelete_image_urls());

        return HttpStatus.NO_CONTENT;
    }

    //물품 등록 후 5분 이내 물품 삭제 요청
    @DeleteMapping
    public HttpStatus deleteItem(@RequestBody ItemDto.DeleteItemDto deleteDto) {
        itemService.removeItem(deleteDto.getItem_id(), deleteDto.getSeller_id());

        return HttpStatus.NO_CONTENT;
    }
}
