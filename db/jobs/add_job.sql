INSERT INTO jobs
(company_name,
company_type,
title,
salary,
street,
city,
state,
zipcode,
phone,
post_date,
experience,
description,
free_housing,
default_phone)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
RETURNING *;
