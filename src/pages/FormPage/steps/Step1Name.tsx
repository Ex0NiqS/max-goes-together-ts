type Step1NameProps = {
	value: string
	onChange: (value: string) => void
}

const Step1Name = ({ value, onChange }: Step1NameProps) => (
	<div className="form-field">
		<label className="field-label" htmlFor="survey-name">
			Как вас зовут?
		</label>
		<input
			className="text-input"
			id="survey-name"
			autoComplete="name"
			maxLength={40}
			placeholder="Введите имя"
			value={value}
			onChange={(event) => onChange(event.target.value)}
		/>
	</div>
)

export default Step1Name
