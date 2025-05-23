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
  Infos: [{ Title: '', Description: '', IdAttractionInfoType: '' }],
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
        console.error("Erro ao carregar países:", error);
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

  const handleImageChange = (e, index) => {
    const { name, value } = e.target;
    const updatedImages = [...form.Images];
    updatedImages[index][name] = value;
    setForm(prev => ({ ...prev, Images: updatedImages }));
  };

  const handleImageMainChange = (e, index) => {
    const updatedImages = form.Images.map((img, i) => ({
      ...img,
      IsMain: i === index ? e.target.checked : false,
    }));
    setForm(prev => ({ ...prev, Images: updatedImages }));
  };

  const handleInfoChange = (e, index, field) => {
    const updatedInfos = [...form.Infos];
    updatedInfos[index][field] = field === 'IdAttractionInfoType' ? Number(e.target.value) : e.target.value;
    setForm(prev => ({ ...prev, Infos: updatedInfos }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando para a API:", form);
      await axios.post('http://localhost:8080/deisi2056/api/Attraction/attraction', form);
      setStatus('success');
      setForm(initialFormState);
    } catch (error) {
      console.error("Erro ao criar atração:", error);
      if (error.response) {
        console.log("Erro detalhado do backend:", JSON.stringify(error.response.data, null, 2));
      } else {
        console.log("Erro desconhecido:", error.message);
      }
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#083344] to-[#0f172a] py-16 px-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] text-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl space-y-8"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center tracking-tight">Criar Nova Atração</h2>

        {status === 'success' && <p className="text-green-400 text-center">Atração criada com sucesso!</p>}
        {status === 'error' && <p className="text-red-400 text-center">Erro ao criar atração.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextInput name="Name" value={form.Name} onChange={handleChange} placeholder="Nome" required />
          <TextInput name="ShortDescription" value={form.ShortDescription} onChange={handleChange} placeholder="Descrição curta" />
          <TextInput name="AddressOne" value={form.AddressOne} onChange={handleChange} placeholder="Morada 1" />
          <TextInput name="AddressTwo" value={form.AddressTwo} onChange={handleChange} placeholder="Morada 2" />
          <TextInput type="number" name="DurationMinutes" value={form.DurationMinutes || ''} onChange={handleChange} placeholder="Duração (min)" />
        </div>

        <Textarea name="LongDescription" value={form.LongDescription} onChange={handleChange} placeholder="Descrição longa" />

        <select
          name="IdCountry"
          value={form.IdCountry}
          onChange={handleChange}
          required
          className="w-full bg-[#0f172a] text-white p-3 rounded-xl border border-gray-500"
        >
          <option value="">Seleciona um país</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>

        <h3 className="text-2xl font-bold mt-8 mb-2">Imagens</h3>
        {form.Images.map((img, index) => (
          <div key={index} className="bg-[#0f172a] p-5 rounded-xl mb-4 space-y-3 shadow-md">
            <TextInput
              name="PictureRef"
              value={img.PictureRef}
              onChange={(e) => handleImageChange(e, index)}
              placeholder="URL da imagem"
            />
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={img.IsMain}
                onChange={(e) => handleImageMainChange(e, index)}
                className="form-checkbox accent-cyan-500"
              />
              Principal?
            </label>
          </div>
        ))}

        <h3 className="text-2xl font-bold mt-8 mb-2">Informações adicionais</h3>
        {form.Infos.map((info, index) => (
          <div key={index} className="bg-[#0f172a] p-5 rounded-xl mb-4 space-y-3 shadow-md">
            <TextInput
              name="Title"
              value={info.Title}
              onChange={(e) => handleInfoChange(e, index, 'Title')}
              placeholder="Título"
            />
            <Textarea
              name="Description"
              value={info.Description}
              onChange={(e) => handleInfoChange(e, index, 'Description')}
              placeholder="Descrição"
            />
            <TextInput
              type="number"
              name="IdAttractionInfoType"
              value={info.IdAttractionInfoType}
              onChange={(e) => handleInfoChange(e, index, 'IdAttractionInfoType')}
              placeholder="ID Tipo Informação"
            />
          </div>
        ))}

        <div className="text-center mt-6">
          <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg hover:scale-105">
            Criar Atração
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAttractionForm;
