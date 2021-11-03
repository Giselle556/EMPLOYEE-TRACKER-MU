use employees;

INSERT INTO department (name)
VALUES
("Gryffindor"),
("Hufflepuff"),
("Ravenclaw"),
("Slytherin");

INSERT INTO role (title,salary,department_id)
VALUES
("Head Boy",500000,1),
("Head Girl",80000,1),
("Professor",250000,1),
("SAuditor",620000,2),
("Howler",320000,2),
("Death Eater",425000,3),
("Owl",950000,1),


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES
("Harry","Potter",1,NULL),
("Hermoine","Granger",2,1),
("Ron","Weasley",3,2),
("Tom","Riddle",4,NULL),
("Arthur","Weasley",5,4),
("Pansy","Brown",6,NULL),
("Draco","Lucious",7,NULL),
