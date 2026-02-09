const buildTranslatedFileName = (name: string) => {
  const dotIndex = name.lastIndexOf(".");
  if (dotIndex === -1) return `${name}-translated`;
  return name.slice(0, dotIndex) + "-translated" + name.slice(dotIndex);
};

export default buildTranslatedFileName;
