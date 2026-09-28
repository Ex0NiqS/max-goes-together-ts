const eventOptions = [
	'Концерты',
	'Выставки',
	'Театр',
	'Кино',
	'Фестивали',
	'Мастер-классы',
	'Спорт',
	'Квесты',
]

type Step3EventsProps = {
	value: string[]
	onChange: (value: string[]) => void
}

const Step3Events = ({ value, onChange }: Step3EventsProps) => {
	const toggleEvent = (eventName: string) => {
		onChange(
			value.includes(eventName)
				? value.filter((selectedEvent) => selectedEvent !== eventName)
				: [...value, eventName],
		)
	}

	return (
		<div className="form-field event-field">
			<p className="field-label">Какие события вас интересуют?</p>
			<p className="field-hint">Можно выбрать несколько вариантов</p>
			<div className="choice-list" aria-label="Интересующие события">
				{eventOptions.map((eventName) => {
					const isSelected = value.includes(eventName)

					return (
						<button
							className={`choice-chip${isSelected ? ' is-selected' : ''}`}
							type="button"
							aria-pressed={isSelected}
							key={eventName}
							onClick={() => toggleEvent(eventName)}
						>
							{eventName}
							{isSelected && <span className="chip-remove" aria-hidden="true">×</span>}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default Step3Events
