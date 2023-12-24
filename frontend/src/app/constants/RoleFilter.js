export const filterRole = (role) => {
  switch (role) {
    case "ROLE_USER":
      return "Utilisateur";
    case "ROLE_ADMIN":
      return "Administrateur";
    case "ROLE_SUPER":
      return "Super"
    // Ajoutez d'autres cas pour d'autres rôles si nécessaire
    default:
      return role; // Retourne le rôle tel quel si aucune correspondance
  }
};
