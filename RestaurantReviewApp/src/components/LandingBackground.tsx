import { FakeReview } from './FakeReview'

export const LandingBackground = () => {
  return (
    <div className="w-full min-h-screen relative flex flex-col md:flex-row">

        {/* Left Text */}
        <div className="w-full md:w-1/2 md:absolute md:top-12 md:left-12 px-6 pt-10 md:px-0 md:pt-0">
            <p className="text-3xl sm:text-4xl md:text-6xl font-bold text-center md:text-left max-w-xl pb-10">
                Keep personal reviews of your favourite (or not) places to eat!
            </p>
            <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-center md:text-left max-w-xl pt-10">
                Also share your reviews with friends and see their reviews as well!
            </p>
        </div>

        {/* Fake Reviews Section */}
        <div className="w-full md:w-1/2 md:ml-auto flex flex-col gap-10 md:gap-0 md:justify-start md:pt-24 md:space-y-24 px-6 md:px-10 pb-12 md:pb-0">

            <div className="md:self-start">
            <FakeReview
                name="Sushi Place"
                rating={5}
                category="🍣Sushi"
                favoriteDishes="Salmon Nigiri, Spicy Tuna Roll"
                comments="Best sushi in town! Fresh fish and great variety."
            />
            </div>

            <div className="md:self-end">
            <FakeReview
                name="Pasta Corner"
                rating={3}
                category="🍝Pasta, 🥗Salads"
                favoriteDishes="Fettuccine Alfredo, Margherita Pizza"
                comments="Decent pasta but the pizza was a bit underwhelming."
                friendName="Alice"
            />
            </div>

            <div className="md:self-start">
            <FakeReview
                name="Taco Town"
                rating={4}
                category="🌮Tacos"
                favoriteDishes="Carne Asada Tacos, Guacamole"
                comments="Great flavors and generous portions. A bit spicy for some dishes."
            />
            </div>

        </div>
    </div>
  )
}
