CREATE TABLE users{
  user_id serial,
  name text,
  email text,
  phone_number text,
  role text,
  primary key(user_id)
}

CREATE TABLE event{
  event_id serial,
  name text,
  address text,
  start_timestamp timestamp,
  end_timestamp timestamp,
  organizer_id int,
  max_volunteers int,
  description text,
  image_path text,
  primary key(event_id),
  foreign key(organizer_id) references users(user_id)
}

CREATE TABLE event_signup{
  event_signup_id serial,
  event_id int,
  user_id int,
  is_waitlisted boolean,
  waitlist_timestamp timestamp,
  primary key(event_signup_id),
  foreign key(event_id) references event(event_id),
  foreign key(user_id) references users(user_id)
}

CREATE TABLE event_attendance{
  event_attendance_id serial,
  event_id int,
  hours float,
  comment text,
  rating float,
  attendee_id int,
  primary key(event_attendance_id),
  foreign key(event_id) references event(event_id),
  foreign key(attendee_id) references users(user_id)
}


