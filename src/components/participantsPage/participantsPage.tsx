import React from "react";
import styles from "./participantsPage.module.css";

interface IParticipant {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  photo: string; 
}

const ParticipantsPage: React.FC = () => {
  const participants: IParticipant[] = [
    {
      id: 1,
      firstName: "Vasile",
      lastName: "Versina",
      specialization: "FrontEnd",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Xnp5sqAeZx9FlQUlmKKQwXFj977Cx-9TIw&s", 
    },
    {
      id: 2,
      firstName: "Marina",
      lastName: "Matsveyenka",
      specialization: "FrontEnd",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Xnp5sqAeZx9FlQUlmKKQwXFj977Cx-9TIw&s", 
    },
    {
      id: 3,
      firstName: "Denis",
      lastName: "Nejelschi",
      specialization: "BackEnd",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Xnp5sqAeZx9FlQUlmKKQwXFj977Cx-9TIw&s", 
    },
    {
      id: 4,
      firstName: "Boris",
      lastName: "Iurciuc",
      specialization: "BackEnd",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Xnp5sqAeZx9FlQUlmKKQwXFj977Cx-9TIw&s", 
    },
    {
      id: 5,
      firstName: "Vitalii",
      lastName: "Kovtun",
      specialization: "FrontEnd",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Xnp5sqAeZx9FlQUlmKKQwXFj977Cx-9TIw&s", 
    },
  ];

  return (
    <div className={styles.participantsContainer}>
      <div className={styles.headerContainer}> 
        <h2>Project Participants</h2>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsPage;
