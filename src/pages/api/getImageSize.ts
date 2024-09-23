// pages/api/getImageSize.js
import sizeOf from 'image-size';

export default async function handler(req:any, res:any) {
  const { imageUrl } = req.body;

  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const dimensions = sizeOf(Buffer.from(buffer));

    res.status(200).json(dimensions);
  } catch (error) {
    console.error('Erro ao obter dimensões da imagem:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
