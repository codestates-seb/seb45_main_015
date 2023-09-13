package com.project15.server.item.repository;

import com.project15.server.item.entity.Item;
import org.springframework.data.jpa.domain.Specification;


import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;


public class ItemSpecification {
    public static Specification<Item> contentContainsKeywords(List<String> keywords) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            for (String keyword : keywords) {
                predicates.add(criteriaBuilder.like(root.get("title"), "%" + keyword + "%"));
            }

            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }
}
