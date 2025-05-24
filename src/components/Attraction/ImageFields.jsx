function ImageFields({ images, onImageChange, onAddImage, onRemoveImage, errors }) {
  return (
    <div>
      <h3 className="font-semibold">Imagens</h3>
      {images.map((img, i) => (
        <div key={i} className="flex flex-col mb-2">
          <input
            type="text"
            placeholder="URL da imagem"
            value={img.PictureRef}
            onChange={(e) => onImageChange(i, 'PictureRef', e.target.value)}
            className="w-full p-2 border rounded"
          />
          {errors[`Images_${i}`] && <p className="text-red-500 text-sm">{errors[`Images_${i}`]}</p>}
          <label className="flex items-center space-x-1 mt-1">
            <input
              type="checkbox"
              checked={img.IsMain}
              onChange={(e) => onImageChange(i, 'IsMain', e.target.checked)}
            />
            <span>Principal</span>
          </label>
          <button type="button" onClick={() => onRemoveImage(i)} className="text-red-600 self-start">🗑</button>
        </div>
      ))}
      {errors.Images && <p className="text-red-500 text-sm">{errors.Images}</p>}
      <button type="button" onClick={onAddImage} className="text-blue-600">+ Adicionar Imagem</button>
    </div>
  );
}

export default ImageFields;
