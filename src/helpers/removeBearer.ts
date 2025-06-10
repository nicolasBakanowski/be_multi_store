export function removeBearerPrefix(token: string): string {
  if (token.startsWith("Bearer ")) {
    return token.slice(7); // Elimina los primeros 7 caracteres (la longitud de "Bearer ")
  }
  return token;
}
