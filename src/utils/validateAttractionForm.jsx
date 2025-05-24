export function validateAttractionForm(form) {
  const errors = {};

  if (!form.Name.trim()) errors.Name = 'O nome é obrigatório.';
  if (!form.ShortDescription.trim()) errors.ShortDescription = 'A descrição curta é obrigatória.';
  if (!form.LongDescription.trim()) errors.LongDescription = 'A descrição longa é obrigatória.';
  if (!form.DurationMinutes || isNaN(form.DurationMinutes)) errors.DurationMinutes = 'A duração é obrigatória.';
  if (!form.AddressOne.trim()) errors.AddressOne = 'A morada é obrigatória.';
  if (!form.IdCountry || form.IdCountry === 0) errors.IdCountry = 'Seleciona um país.';

  if (form.Images.length === 0) {
    errors.Images = 'É necessário pelo menos uma imagem.';
  } else {
    const mainImages = form.Images.filter(img => img.IsMain && img.PictureRef.trim());
    if (mainImages.length !== 1) {
      errors.Images = 'Deves marcar exatamente uma imagem como principal.';
    }

    form.Images.forEach((img, index) => {
      if (!img.PictureRef.trim()) {
        errors[`Images_${index}`] = 'URL da imagem obrigatório.';
      }
    });
  }

  form.Infos.forEach((info, index) => {
    if (!info.Title.trim()) {
      errors[`Infos_${index}_Title`] = 'Título obrigatório.';
    }
    if (!info.Description.trim()) {
      errors[`Infos_${index}_Description`] = 'Descrição obrigatória.';
    }
    if (!info.IdAttractionInfoType || isNaN(info.IdAttractionInfoType)) {
      errors[`Infos_${index}_IdAttractionInfoType`] = 'Tipo de informação inválido.';
    }
  });

  return errors;
}
