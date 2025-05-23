import { useState, useEffect } from 'react';
import { getAllCountries } from '../services/countryService';
import TextInput from '../components/TextInput';
import Textarea from '../components/Textarea';
import axios from 'axios';

const initialFormState = {
  Name: '',
  ShortDescription: '',
  LongDescription: '',
  DurationMinutes: '',
  AddressOne: '',
  AddressTwo: '',
  IdCountry: '',
  Images: [{ PictureRef: '', IsMain: false }],
  Infos: [{ Title: '', Description: '', IdAttractionInfoType: '' }]
};

function CreateAttractionForm() {
  const [form, setForm] = useState(initialFormState);
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await getAllCountries();
        setCountries(data);
      } catch (error) {
        console.error('Erro ao carregar países:', error);
      }
    }
    loadCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['DurationMinutes', 'IdCountry'].includes(name)
        ? Number(value)
        : value
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
    try {
      console.log('Enviando para a API:', form);
      await axios.post('http://localhost:8080/deisi2056/api/Attraction/attraction', form);
      setStatus('success');
      setForm(initialFormState);
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
        <TextInput name="Name" value={form.Name} onChange={handleChange} placeholder="Nome" required />
        <TextInput name="ShortDescription" value={form.ShortDescription} onChange={handleChange} placeholder="Descrição curta" />
        <Textarea name="LongDescription" value={form.LongDescription} onChange={handleChange} placeholder="Descrição longa" />
        <TextInput type="number" name="DurationMinutes" value={form.DurationMinutes || ''} onChange={handleChange} placeholder="Duração (minutos)" />
        <TextInput name="AddressOne" value={form.AddressOne} onChange={handleChange} placeholder="Morada 1" />
        <TextInput name="AddressTwo" value={form.AddressTwo} onChange={handleChange} placeholder="Morada 2" />

        <select name="IdCountry" value={form.IdCountry} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Seleciona um país</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>

        {/* Images */}
        <div>
          <h3 className="font-semibold">Imagens</h3>
          {form.Images.map((img, i) => (
            <div key={i} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="URL da imagem"
                value={img.PictureRef}
                onChange={(e) => handleImageChange(i, 'PictureRef', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <label className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={img.IsMain}
                  onChange={(e) => handleImageChange(i, 'IsMain', e.target.checked)}
                />
                <span>Principal</span>
              </label>
              <button type="button" onClick={() => removeImage(i)} className="text-red-600">🗑</button>
            </div>
          ))}
          <button type="button" onClick={addImage} className="text-blue-600">+ Adicionar Imagem</button>
        </div>

        {/* Infos */}
        <div>
          <h3 className="font-semibold">Informações</h3>
          {form.Infos.map((info, i) => (
            <div key={i} className="space-y-1 mb-3">
              <TextInput
                placeholder="Título"
                value={info.Title}
                onChange={(e) => handleInfoChange(i, 'Title', e.target.value)}
              />
              <Textarea
                placeholder="Descrição"
                value={info.Description}
                onChange={(e) => handleInfoChange(i, 'Description', e.target.value)}
              />
              <TextInput
                placeholder="Tipo de Info (Id)"
                value={info.IdAttractionInfoType}
                type="number"
                onChange={(e) => handleInfoChange(i, 'IdAttractionInfoType', e.target.value)}
              />
              <button type="button" onClick={() => removeInfo(i)} className="text-red-600">🗑 Remover</button>
            </div>
          ))}
          <button type="button" onClick={addInfo} className="text-blue-600">+ Adicionar Informação</button>
        </div>

        <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700">
          Criar
        </button>
      </form>
    </div>
  );
}

export default CreateAttractionForm;
