package com.elan.empApp.model;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * Base abstract class for entities which will hold definitions for created, last modified by and created,
 * last modified by date.
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractAuditingEntity {

    @CreatedDate
    @NotNull
    @Column(name = "created_on", nullable = false)
    private Date createdDate = new Date();

    @LastModifiedDate
    @Column(name = "updated_on")
    private Date updatedDate = new Date();

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		long timezoneAlteredTime = createdDate.getTime() + TimeZone.getTimeZone("Asia/Calcutta").getRawOffset() -
				TimeZone.getTimeZone("EST").getRawOffset();
	    Calendar cSchedStartCal1 = Calendar.getInstance(TimeZone.getTimeZone("Asia/Calcutta"));
	    cSchedStartCal1.setTimeInMillis(timezoneAlteredTime);
		this.createdDate = cSchedStartCal1.getTime();
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		long timezoneAlteredTime = updatedDate.getTime() + TimeZone.getTimeZone("Asia/Calcutta").getRawOffset()-
				TimeZone.getTimeZone("EST").getRawOffset();
	    Calendar cSchedStartCal1 = Calendar.getInstance(TimeZone.getTimeZone("Asia/Calcutta"));
	    cSchedStartCal1.setTimeInMillis(timezoneAlteredTime);
		this.updatedDate = cSchedStartCal1.getTime();;
	}

}
