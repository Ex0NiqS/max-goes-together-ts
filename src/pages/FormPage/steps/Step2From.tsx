type Step2FromProps = {
	value: string
	onChange: (value: string) => void
}

const Step2From = ({ value, onChange }: Step2FromProps) => (
	<div className="form-field">
		<label className="field-label" htmlFor="survey-city">
			Откуда вы?
		</label>
		<div className="select-wrap">
			<select
				className="text-input city-select"
				id="survey-city"
				value={value}
				onChange={(event) => onChange(event.target.value)}
			>
				<option value="" disabled>
					Выберите город
				</option>
				<option>Москва</option>
				<option>Санкт-Петербург</option>
				<option>Казань</option>
				<option>Екатеринбург</option>
				<option>Новосибирск</option>
				<option>Другой город</option>
			</select>
			<span className="select-chevron" aria-hidden="true" />
		</div>
	</div>
)

export default Step2From
