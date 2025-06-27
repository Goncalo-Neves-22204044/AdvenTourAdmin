import { useState } from 'react';
import TextInput from '../components/TextInput';
import Textarea from '../components/Textarea';
import { initialFormState } from '../constants/AttractionFormDefault';
import { validateAttractionForm } from '../utils/validateAttractionForm';
import { useInfoTypes } from '../hooks/useInfoTypes';
import ImageFields from '../components/Attraction/ImageFields';
import InfoFields from '../components/Attraction/InfoFields';
import CountryDropdown from '../components/CountryDropdown'; // <- substituído
import api from '../services/api';

function CreateAttractionForm() {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const { infoTypes } = useInfoTypes();

  const updateFormField = (name, value) => {
    const parsedValue = ['DurationMinutes', 'IdCountry'].includes(name) ? Number(value) : value;
    setForm(prev => ({ ...prev, [name]: parsedValue }));
  };

  const updateFormArray = (arrayName, index, field, value, parseToNumber = false) => {
    const updated = [...form[arrayName]];
    updated[index][field] = parseToNumber ? Number(value) : value;
    setForm(prev => ({ ...prev, [arrayName]: updated }));
  };

  const addFormArrayItem = (arrayName, newItem) => {
    setForm(prev => ({ ...prev, [arrayName]: [...prev[arrayName], newItem] }));
  };

  const removeFormArrayItem = (arrayName, index) => {
    const updated = form[arrayName].filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, [arrayName]: updated }));
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
      await api.post('/Attraction/attraction', form);
      setStatus('success');
      setForm({
        ...initialFormState,
        Images: [{ PictureRef: '', IsMain: false }],
        Infos: [{ Title: '', Description: '', IdAttractionInfoType: '' }]
      });
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
    <div className="w-full p-4 space-y-4">
      <h2 className="text-xl font-semibold text-center">Criar Atração</h2>

      {status === 'success' && <p className="text-green-600 text-center">Atração criada com sucesso!</p>}
      {status === 'error' && <p className="text-red-600 text-center">Erro ao criar atração.</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[ 
          { name: 'Name', placeholder: 'Nome' },
          { name: 'ShortDescription', placeholder: 'Descrição curta' },
          { name: 'AddressOne', placeholder: 'Morada 1' },
          { name: 'AddressTwo', placeholder: 'Morada 2' }
        ].map(({ name, placeholder }) => (
          <div key={name}>
            <TextInput
              name={name}
              value={form[name]}
              onChange={(e) => updateFormField(name, e.target.value)}
              placeholder={placeholder}
            />
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}

        <div>
          <Textarea
            name="LongDescription"
            value={form.LongDescription}
            onChange={(e) => updateFormField('LongDescription', e.target.value)}
            placeholder="Descrição longa"
          />
          {errors.LongDescription && <p className="text-red-500 text-sm">{errors.LongDescription}</p>}
        </div>

        <div>
          <TextInput
            type="number"
            name="DurationMinutes"
            value={form.DurationMinutes || ''}
            onChange={(e) => updateFormField('DurationMinutes', e.target.value)}
            placeholder="Duração (minutos)"
          />
          {errors.DurationMinutes && <p className="text-red-500 text-sm">{errors.DurationMinutes}</p>}
        </div>

        <div>
          <CountryDropdown
            value={form.IdCountry}
            onChange={(id) => updateFormField('IdCountry', id)}
            valueKey="id"
            includeAllOption={false}
            placeholder="-- Seleciona um país --"
          />
          {errors.IdCountry && <p className="text-red-500 text-sm">{errors.IdCountry}</p>}
        </div>

        <ImageFields
          images={form.Images}
          onImageChange={(i, f, v) => updateFormArray('Images', i, f, v)}
          onAddImage={() => addFormArrayItem('Images', { PictureRef: '', IsMain: false })}
          onRemoveImage={(i) => removeFormArrayItem('Images', i)}
          errors={errors}
        />

        <InfoFields
          infos={form.Infos}
          onInfoChange={(i, f, v) => updateFormArray('Infos', i, f, v, f === 'IdAttractionInfoType')}
          onAddInfo={() => addFormArrayItem('Infos', { Title: '', Description: '', IdAttractionInfoType: '' })}
          onRemoveInfo={(i) => removeFormArrayItem('Infos', i)}
          infoTypes={infoTypes}
          errors={errors}
        />

        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Criar
        </button>
      </form>
    </div>
  );
}

export default CreateAttractionForm;
