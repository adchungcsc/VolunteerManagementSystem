CREATE TABLE users
(
    user_id      serial,
    name         text,
    email        text,
    phone_number text,
    role         text,
    primary key (user_id)
);

CREATE TABLE event
(
    event_id        serial,
    event_name      text,
    event_location  text,
    event_start     timestamp,
    event_end       timestamp,
    event_organizer int,
    event_max_volunteers  int,
    event_description     text,
    event_image     text,
    primary key (event_id),
    foreign key (organizer_id) references users (user_id)
);

CREATE TABLE event_signup
(
    event_signup_id    serial,
    event_id           int,
    user_id            int,
    is_waitlisted      boolean,
    waitlist_timestamp timestamp,
    primary key (event_signup_id),
    foreign key (event_id) references event (event_id),
    foreign key (user_id) references users (user_id)
);

CREATE TABLE event_attendance
(
    event_attendance_id serial,
    event_id            int,
    hours               float,
    comment             text,
    rating              float,
    attendee_id         int,
    primary key (event_attendance_id),
    foreign key (event_id) references event (event_id),
    foreign key (attendee_id) references users (user_id)
);
