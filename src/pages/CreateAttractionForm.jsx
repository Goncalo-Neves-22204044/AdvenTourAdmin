import { useState } from 'react';
import TextInput from '../components/TextInput';
import Textarea from '../components/Textarea';
import { initialFormState } from '../constants/AttractionFormDefault';
import { validateAttractionForm } from '../utils/validateAttractionForm';
import { useCountries } from '../hooks/useCountries';
import { useInfoTypes } from '../hooks/useInfoTypes';
import ImageFields from '../components/Attraction/ImageFields';
import InfoFields from '../components/Attraction/InfoFields';
import axios from 'axios';

function CreateAttractionForm() {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const { countries } = useCountries();
  const { infoTypes } = useInfoTypes();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['DurationMinutes', 'IdCountry'].includes(name) ? Number(value) : value
    }));
  };

  const handleImageChange = (index, field, value) => {
    const updated = [...form.Images];
    updated[index][field] = field === 'IsMain' ? value : value;
    setForm(prev => ({ ...prev, Images: updated }));
  };

  const addImage = () => {
    setForm(prev => ({
      ...prev,
      Images: [...prev.Images, { PictureRef: '', IsMain: false }]
    }));
  };

  const removeImage = (index) => {
    const updated = form.Images.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, Images: updated }));
  };

  const handleInfoChange = (index, field, value) => {
    const updated = [...form.Infos];
    updated[index][field] = field === 'IdAttractionInfoType' ? Number(value) : value;
    setForm(prev => ({ ...prev, Infos: updated }));
  };

  const addInfo = () => {
    setForm(prev => ({
      ...prev,
      Infos: [...prev.Infos, { Title: '', Description: '', IdAttractionInfoType: '' }]
    }));
  };

  const removeInfo = (index) => {
    const updated = form.Infos.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, Infos: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAttractionForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('invalid');
      return;
    }

    try {
      await axios.post('http://localhost:8080/deisi2056/api/Attraction/attraction', form);
      setStatus('success');
      setForm({ ...initialFormState, Images: [{ PictureRef: '', IsMain: false }], Infos: [{ Title: '', Description: '', IdAttractionInfoType: '' }] });
      setErrors({});
    } catch (error) {
      console.error('Erro ao criar atração:', error);
      if (error.response) {
        console.log('Erro detalhado do backend:', JSON.stringify(error.response.data, null, 2));
      }
      setStatus('error');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded space-y-4">
      <h2 className="text-2xl font-bold">Criar Atração</h2>

      {status === 'success' && <p className="text-green-600">Atração criada com sucesso!</p>}
      {status === 'error' && <p className="text-red-600">Erro ao criar atração.</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextInput name="Name" value={form.Name} onChange={handleChange} placeholder="Nome" />
          {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}
        </div>

        <div>
          <TextInput name="ShortDescription" value={form.ShortDescription} onChange={handleChange} placeholder="Descrição curta" />
          {errors.ShortDescription && <p className="text-red-500 text-sm">{errors.ShortDescription}</p>}
        </div>

        <div>
          <Textarea name="LongDescription" value={form.LongDescription} onChange={handleChange} placeholder="Descrição longa" />
          {errors.LongDescription && <p className="text-red-500 text-sm">{errors.LongDescription}</p>}
        </div>

        <div>
          <TextInput type="number" name="DurationMinutes" value={form.DurationMinutes || ''} onChange={handleChange} placeholder="Duração (minutos)" />
          {errors.DurationMinutes && <p className="text-red-500 text-sm">{errors.DurationMinutes}</p>}
        </div>

        <div>
          <TextInput name="AddressOne" value={form.AddressOne} onChange={handleChange} placeholder="Morada 1" />
          {errors.AddressOne && <p className="text-red-500 text-sm">{errors.AddressOne}</p>}
        </div>

        <TextInput name="AddressTwo" value={form.AddressTwo} onChange={handleChange} placeholder="Morada 2" />

        <div>
          <select name="IdCountry" value={form.IdCountry} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Seleciona um país</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </select>
          {errors.IdCountry && <p className="text-red-500 text-sm">{errors.IdCountry}</p>}
        </div>

        <div>
            <ImageFields
              images={form.Images}
              onImageChange={handleImageChange}
              onAddImage={addImage}
              onRemoveImage={removeImage}
              errors={errors}
            />
        </div>

        <div>
          <InfoFields
            infos={form.Infos}
            onInfoChange={handleInfoChange}
            onAddInfo={addInfo}
            onRemoveInfo={removeInfo}
            infoTypes={infoTypes}
            errors={errors}
          />
        </div>

        <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700">
          Criar
        </button>
      </form>
    </div>
  );
}

export default CreateAttractionForm;
