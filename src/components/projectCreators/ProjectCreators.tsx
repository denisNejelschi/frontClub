import React from "react";
import styles from "./projectCreators.module.css"

interface IParticipant {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  photo: string; 
  linkedin: string;
}

const ProjectCreators: React.FC = () => {
  const participants: IParticipant[] = [
    {
      id: 1,
      firstName: "Vasile",
      lastName: "Versina",
      specialization: "FrontEnd",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Xnp5sqAeZx9FlQUlmKKQwXFj977Cx-9TIw&s", 
      linkedin: "https://www.linkedin.com/in/vasile-versina-706a1b333"
    },
    {
      id: 2,
      firstName: "Maryna",
      lastName: "Matsveyenka",
      specialization: "FrontEnd",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Xnp5sqAeZx9FlQUlmKKQwXFj977Cx-9TIw&s", 
      linkedin: "https://www.linkedin.com/in/maryna-matsveyenka"
    },
    {
      id: 3,
      firstName: "Denis",
      lastName: "Nejelschi",
      specialization: "BackEnd",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Xnp5sqAeZx9FlQUlmKKQwXFj977Cx-9TIw&s", 
      linkedin:"https://www.linkedin.com/in/denis-nejelschi-3b484337"
    },
    {
      id: 4,
      firstName: "Boris",
      lastName: "Iurciuc",
      specialization: "BackEnd",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Xnp5sqAeZx9FlQUlmKKQwXFj977Cx-9TIw&s", 
      linkedin:"https://www.linkedin.com/in/boris-iurciuc-44000259"
    },
    {
      id: 5,
      firstName: "Vitalii",
      lastName: "Kovtun",
      specialization: "FrontEnd",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Xnp5sqAeZx9FlQUlmKKQwXFj977Cx-9TIw&s", 
      linkedin:"https://www.linkedin.com"
    },
    {
      id: 6,
      firstName: "Dimitri",
      lastName: "Heinrich",
      specialization: "BackEnd",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Xnp5sqAeZx9FlQUlmKKQwXFj977Cx-9TIw&s", 
      linkedin:"https://www.linkedin.com/in/dimitri-heinrich-813789333"
    },
  ];

  return (
    <div className={styles.participantsContainer}>
      <div className={styles.headerContainer}> 
        <h2>Project Creators</h2>
      </div>
      <div className={styles.participantList}>
        {participants.map((participant) => (
          <div key={participant.id} className={styles.participantCard}>
            <img
              src={participant.photo}
              alt={`${participant.firstName} ${participant.lastName}`}
              className={styles.participantPhoto}
            />
            <h3>{`${participant.firstName} ${participant.lastName}`}</h3>
            <p>Specialization: {participant.specialization}</p>
            <a 
              href={participant.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.linkedinLink}
            >
              LinkedIn Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCreators;
