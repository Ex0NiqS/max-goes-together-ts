export type GenreGroup = {
	title: string
	options: string[]
}

export const genreGroupsByInterest: Record<string, GenreGroup[]> = {
	'Концерты': [{ title: 'МУЗЫКА', options: ['Рок', 'Электро', 'Поп', 'Джаз', 'Классика', 'Хип-хоп'] }],
	'Выставки': [{ title: 'ИСКУССТВО', options: ['Современное искусство', 'История', 'Фотография', 'Скульптура', 'Графика'] }],
	'Театр': [{ title: 'ТЕАТР', options: ['Драма', 'Комедия', 'Мюзикл', 'Классика', 'Эксперимент'] }],
	'Кино': [{ title: 'КИНО', options: ['Комедия', 'Драма', 'Фантастика', 'Боевик', 'Триллер', 'Ужасы', 'Мультфильмы'] }],
	'Фестивали': [{ title: 'ФЕСТИВАЛИ', options: ['Музыка', 'Кино', 'Фольклор', 'Food', 'Эко'] }],
	'Мастер-классы': [{ title: 'МАСТЕР-КЛАСС', options: ['Рукоделие', 'Кулинария', 'Рисование', 'DIY', 'Фотография'] }],
	'Спорт': [{ title: 'СПОРТ', options: ['Командный', 'Активный', 'Экстремальный', 'Легкий', 'Выездной'] }],
	'Квесты': [{ title: 'КВЕСТЫ', options: ['Мистика', 'Приключения', 'Детектив', 'Перформанс', 'Семейные', 'Экшн'] }],
}

export const getAvailableGenreGroupsForInterests = (selectedInterests: string[]): GenreGroup[] =>
	selectedInterests.flatMap((interest) => genreGroupsByInterest[interest] ?? [])

type Step4GenresProps = {
	value: string[]
	selectedInterests: string[]
	onChange: (value: string[]) => void
}

const Step4Genres = ({ value, selectedInterests, onChange }: Step4GenresProps) => {
	const genreGroups: GenreGroup[] = getAvailableGenreGroupsForInterests(selectedInterests)

	const toggleGenre = (genre: string) => {
		onChange(
			value.includes(genre)
				? value.filter((selectedGenre) => selectedGenre !== genre)
				: [...value, genre],
		)
	}

	return (
		<div className="genre-groups">
			{genreGroups.map(({ title, options }: GenreGroup) => (
				<section className="genre-group" key={title} aria-labelledby={`genre-${title}`}>
					<h2 className="genre-title" id={`genre-${title}`}>
						{title}
					</h2>
					<div className="choice-list genre-choice-list">
						{options.map((genre: string) => {
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
