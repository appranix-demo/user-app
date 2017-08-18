package com.appranix.demoapp.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

/**
 * The user details has been managed.
 */
@Entity
@Table(name = "\"user\"")
public class User {

    /**
     * Parameterized constructor.
     */
    public User() {
        super();
    }

    /**
     * Parameterized constructor.
     *
     * @param username to set
     * @param account to set
     */
    public User(String address) {
        this.address = address;
    }

    /**
     * Auto generated ID.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    /**
     * The name of user.
     */
    private String address;

    /**
     * The first name of user.
     */
    private String firstName;

    /**
     * The last name of user.
     */
    private String lastName;

    /**
     * The unique email ID of user.
     */
    @Pattern(regexp = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\."
            + "[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"
            + "(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
            message = "{invalid.email}")
    private String emailId;

    /**
     * Created date and time.
     */
    @CreatedDate
    @DateTimeFormat(style = "M-")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date_time", updatable = false)
    private Date createdDateTime = new Date();
    
    @Transient
    @JsonIgnore
    @XmlTransient
    SimpleDateFormat format = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy", Locale.getDefault());
    /**
     * Get the user ID.
     *
     * @return the user ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Set the user ID.
     *
     * @param id - the User ID.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Get the user first name.
     *
     * @return the user first name
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Set the first name.
     *
     * @param firstName - the User first name
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Get the user last name.
     *
     * @return the user last name
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Set the last name.
     *
     * @param lastName - the User last name
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Get the name of user.
     *
     * @return the user name.
     */
    public String getAddress() {
        return address;
    }

    /**
     * Set the name.
     *
     * @param username - the User name
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * Get the unique email ID of the user.
     *
     * @return the user email ID.
     */
    public String getEmailId() {
        return emailId;
    }

    /**
     * Set the email ID of the user.
     *
     * @param emailId - the User email ID.
     */
    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

	public String getCreatedDateTime() {
		if (this.createdDateTime == null) {
            return null;
        } else {
            try {
                return format.format(createdDateTime);
            } catch (Exception ex) {
                return null;
            }
        }
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}
    
}
