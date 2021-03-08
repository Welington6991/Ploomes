export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!re.test(email)) return 'Ooops! Nós precisamos de um e-mail valido.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Nome não pode ser vazio.';

  return '';
};
