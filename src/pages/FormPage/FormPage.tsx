import { useState } from 'react'
import logo from '../../assets/logo.png'
import Step1Name from './steps/Step1Name'
import Step2From from './steps/Step2From'
import Step3Events from './steps/Step3Events'
import Step4Genres from './steps/Step4Genres'
import type { SurveyAnswers } from './types'
import { getAvailableGenreGroupsForInterests } from './steps/Step4Genres'
import './FormPage.css'

const stepCopy = [
	{ title: 'Как вас зовут?', addition: 'Так к вам будут обращаться другие участники' },
	{ title: 'Откуда вы?', addition: 'Укажем город, чтобы находить события рядом' },
	{ title: 'Какие события вас интересуют?', addition: 'Выберите всё, куда хотели бы сходить' },
	{ title: 'Какие жанры вам нравятся?', addition: 'Отметьте любимые направления' },
]

type FormPageProps = {
	onBackToWelcome: () => void
}

const FormPage = ({ onBackToWelcome }: FormPageProps) => {
	const [step, setStep] = useState(0)
	const [answers, setAnswers] = useState<SurveyAnswers>({})
	const [error, setError] = useState('')
	const [isComplete, setIsComplete] = useState(false)
	const copy = stepCopy[step]

	const updateAnswer = <Key extends keyof SurveyAnswers>(
		key: Key,
		value: NonNullable<SurveyAnswers[Key]>,
	) => {
		setAnswers((current) => {
			if (key === 'interests') {
				const availableGenres = getAvailableGenreGroupsForInterests(value as string[])
				const validGenres = new Set(availableGenres.flatMap(({ options }) => options))
				return {
					...current,
					interests: value as string[],
					genres: (current.genres ?? []).filter((genre) => validGenres.has(genre)),
				}
			}

			return { ...current, [key]: value }
		})
		setError('')
	}

	const moveForward = () => {
		const availableGenres = getAvailableGenreGroupsForInterests(answers.interests ?? [])
		const validGenreSet = new Set(availableGenres.flatMap(({ options }) => options))
		const selectedGenres = (answers.genres ?? []).filter((genre) => validGenreSet.has(genre))

		const isStepValid = [
			Boolean(answers.name?.trim()),
			Boolean(answers.from),
			Boolean(answers.interests?.length),
			Boolean(selectedGenres.length),
		][step]

		if (!isStepValid) {
			setError(
				step < 2
					? 'Заполните поле, чтобы продолжить'
					: 'Выберите хотя бы один вариант',
			)
			return
		}

		if (step === stepCopy.length - 1) {
			setAnswers((current) => ({ ...current, genres: selectedGenres }))
			setIsComplete(true)
			return
		}

		setStep((current) => current + 1)
		setError('')
	}

	const moveBack = () => {
		setStep((current) => Math.max(0, current - 1))
		setError('')
	}

	if (isComplete) {
		return (
			<main className="form-page form-page-complete">
				<section className="completion-content" aria-live="polite">
					<img className="completion-logo" src={logo} alt="" />
					<p className="completion-eyebrow">Анкета готова</p>
					<h1>Отлично, {answers.name}!</h1>
					<p className="completion-copy">
						Теперь можно искать компанию на события в {answers.from}.
					</p>
					<button className="primary-button completion-button" onClick={onBackToWelcome}>
						На главную
					</button>
				</section>
			</main>
		)
	}

	return (
		<main className="form-page">
			<header className="form-header">
				<h1>Расскажите о себе</h1>
			</header>

			<div className="form-scroll-area">
				<section className="form-main" aria-label={`Шаг ${step + 1} из 4`}>
					<div className="step-intro">
						<div className="progress-row">
							<div
								className="progress-track"
								role="progressbar"
								aria-label="Прогресс анкеты"
								aria-valuemin={1}
								aria-valuemax={4}
								aria-valuenow={step + 1}
							>
								<span style={{ width: `${((step + 1) / stepCopy.length) * 100}%` }} />
							</div>
							<span className="step-count">{step + 1}/4</span>
						</div>
						<h2>{copy.title}</h2>
						<p>{copy.addition}</p>
					</div>

					<div className="step-content">
						{step === 0 && (
							<Step1Name
								value={answers.name ?? ''}
								onChange={(value) => updateAnswer('name', value)}
							/>
						)}
						{step === 1 && (
							<Step2From
								value={answers.from ?? ''}
								onChange={(value) => updateAnswer('from', value)}
							/>
						)}
						{step === 2 && (
							<Step3Events
								value={answers.interests ?? []}
								onChange={(value) => updateAnswer('interests', value)}
							/>
						)}
						{step === 3 && (
							<Step4Genres
								value={answers.genres ?? []}
								selectedInterests={answers.interests ?? []}
								onChange={(value) => updateAnswer('genres', value)}
							/>
						)}
					</div>
				</section>

				<div className="form-error" role="alert" aria-live="polite">
					{error}
				</div>

				<footer className={`form-footer${step === 0 ? ' first-step-footer' : ''}`}>
					{step > 0 && (
						<button className="secondary-button" type="button" onClick={moveBack}>
							Назад
						</button>
					)}
					<button className="primary-button" type="button" onClick={moveForward}>
						{step === stepCopy.length - 1 ? 'Завершить' : 'Продолжить'}
					</button>
					<img className="footer-logo" src={logo} alt="" />
				</footer>
			</div>
		</main>
	)
}

export default FormPage
