import generator from 'generate-password-ts';

export const passwordGenerator = (): string => {
 return generator.generate({
	length: 8,
	numbers: true,
    uppercase: true,
    symbols: true
});
}
