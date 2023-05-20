import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "semantic-ui-react";

const GroupMembership = ({ groupId, onMembershipChange }) => {


return(<>


<butto>Join</butto>



</>)


//   const { isAuthenticated, user } = useAuth0();
//   console.log(user)
//   const userId = user?.sub;
// //user id is only populated if user is existent 
//   const [isMember, setIsMember] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (isAuthenticated && userId) {
//       fetchUserMembership();
//     }
//   }, [isAuthenticated, userId]);

//   const fetchUserMembership = () => {
//     fetch(`http://localhost:8080/membership/${groupId}/${userId}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Error checking membership");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setIsMember(data.isMember);
//       })
//       .catch((error) => {
//         //console.error("Error checking membership:", error);
//         setError(error.message);
//       });
//   };

//   const handleToggleMembership = () => {
//     if (!isMember) {
//       joinGroup();
//     } else {
//       unjoinGroup();
//     }
//   };

//   const joinGroup = () => {
//   fetch(`http://localhost:8080/membership`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       groupId: groupId,
//       userId: userId,
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Error joining group");
//       }
//       setIsMember(true);
//       onMembershipChange(true); // Invoke the callback function to update the membership status
//     })
//     .catch((error) => {
//       //console.error("Error joining group:", error);
//       setError(error.message);
//     });
// };

// const unjoinGroup = () => {
//   fetch(`http://localhost:8080/membership`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       groupId: groupId,
//       userId: userId,
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Error unjoining group");
//       }
//       setIsMember(false);
//       onMembershipChange(false); // Invoke the callback function to update the membership status
//     })
//     .catch((error) => {
//       //console.error("Error unjoining group:", error);
//       setError(error.message);
//     });
// };

//   return (
//     <div>
//       {error && <div>Error: {error}</div>}
//       {isAuthenticated && userId && (
//         <>
//           {isMember ? (
//             <Button onClick={handleToggleMembership}>Unjoin</Button>
//           ) : (
//             <Button onClick={handleToggleMembership}>Join</Button>
//           )}
//         </>
//       )}
//       {!isAuthenticated && <div>Please log in to join the group</div>}
//     </div>
//   );
};

export default GroupMembership;
