import TextInput from '../TextInput';
import Textarea from '../Textarea';

function InfoFields({ infos, onInfoChange, onAddInfo, onRemoveInfo, errors, infoTypes }) {
  return (
    <div>
      <h3 className="font-semibold">Informações</h3>
      {infos.map((info, i) => (
        <div key={i} className="space-y-1 mb-3">
          <TextInput
            placeholder="Título"
            value={info.Title}
            onChange={(e) => onInfoChange(i, 'Title', e.target.value)}
          />
          {errors[`Infos_${i}_Title`] && <p className="text-red-500 text-sm">{errors[`Infos_${i}_Title`]}</p>}

          <Textarea
            placeholder="Descrição"
            value={info.Description}
            onChange={(e) => onInfoChange(i, 'Description', e.target.value)}
          />
          {errors[`Infos_${i}_Description`] && <p className="text-red-500 text-sm">{errors[`Infos_${i}_Description`]}</p>}

          <select
            value={info.IdAttractionInfoType}
            onChange={(e) => onInfoChange(i, 'IdAttractionInfoType', Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleciona o tipo de informação</option>
            {infoTypes.map(type => (
              <option key={type.id} value={type.id}>{type.typeTitle}</option>
            ))}
          </select>
          {errors[`Infos_${i}_IdAttractionInfoType`] && <p className="text-red-500 text-sm">{errors[`Infos_${i}_IdAttractionInfoType`]}</p>}

          <button type="button" onClick={() => onRemoveInfo(i)} className="text-red-600">🗑 Remover</button>
        </div>
      ))}
      <button type="button" onClick={onAddInfo} className="text-blue-600">+ Adicionar Informação</button>
    </div>
  );
}

export default InfoFields;
