import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'name') setName(value);
    else if (name === 'number') setNumber(value);
  };
  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ id: nanoid(), name, number });

    setName('');
    setNumber('');
  };

  return (
    <div>
      <form className={css.containers} onSubmit={handleSubmit}>
        <div className={css['phon-container']}>
          <label htmlFor="exampleInputName" className={css['form-label']}>
            Name
          </label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={handleChange}
            value={name}
            placeholder="Jacob Mercer"
            required
          />
        </div>

        <div className={css['phon-container']}>
          <label htmlFor="exampleInputNumber" className={css['form-label']}>
            Number
          </label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={handleChange}
            value={number}
            placeholder="999-99-99"
            required
          />
        </div>

        <button type="submit" className={css.btn}>
          Add contact
        </button>
      </form>
    </div>
  );
};

