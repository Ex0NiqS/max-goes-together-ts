const genreGroups = [
	{
		title: 'КИНО',
		options: ['Комедия', 'Драма', 'Фантастика', 'Боевик', 'Триллер', 'Ужасы', 'Мультфильмы'],
	},
	{
		title: 'КВЕСТЫ',
		options: ['Мистика', 'Приключения', 'Детектив', 'Перформанс', 'Семейные', 'Экшн'],
	},
]

type Step4GenresProps = {
	value: string[]
	onChange: (value: string[]) => void
}

const Step4Genres = ({ value, onChange }: Step4GenresProps) => {
	const toggleGenre = (genre: string) => {
		onChange(
			value.includes(genre)
				? value.filter((selectedGenre) => selectedGenre !== genre)
				: [...value, genre],
		)
	}

	return (
		<div className="genre-groups">
			{genreGroups.map(({ title, options }) => (
				<section className="genre-group" key={title} aria-labelledby={`genre-${title}`}>
					<h2 className="genre-title" id={`genre-${title}`}>
						{title}
					</h2>
					<div className="choice-list genre-choice-list">
						{options.map((genre) => {
							const isSelected = value.includes(genre)

							return (
								<button
									className={`choice-chip genre-chip${isSelected ? ' is-selected' : ''}`}
									type="button"
									aria-pressed={isSelected}
									key={genre}
									onClick={() => toggleGenre(genre)}
								>
									{genre}
									{isSelected && <span className="chip-remove" aria-hidden="true">×</span>}
								</button>
							)
						})}
					</div>
				</section>
			))}
		</div>
	)
}

export default Step4Genres
