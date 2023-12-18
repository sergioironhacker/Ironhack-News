

const Like = require('../models/Like.model');

// Función para manejar la acción de dar/quitar like
async function toggleLike(userId, newsId) {
  try {
    const existingLike = await Like.findOne({ user: userId, news: newsId });

    if (existingLike) {
      // Si el like ya existe, eliminarlo
      await Like.findByIdAndDelete(existingLike._id);
      return { liked: false };
    } else {
      // Si no existe, crear un nuevo like
      await Like.create({ user: userId, news: newsId });
      return { liked: true };
    }
  } catch (err) {
    console.error(err);
    throw new Error('Error al manejar el like');
  }
}

module.exports = { toggleLike };
