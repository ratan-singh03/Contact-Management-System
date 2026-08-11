package com.codsoft.contactmanagement.repository;

import com.codsoft.contactmanagement.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
