export interface UsefulAddress {
  id: string;
  name: string;
  description: string | null;
  url: string | null;
  position: number;
  icon_name: string | null; // Nouvelle colonne pour le nom de l'icône
}
