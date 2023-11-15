import './homepage.css';

const REQUIREMENTS_DATA = [
  'Be a holder of a KENYAN NATIONAL IDENTITY CARD',
  'Have at least KCSE or KCPE certificate',
  'Be efficient in our two national languages(SWAHILI,ENGLISH)',
  'Should not have physical disabilities',
];

const RESPONSIBILITIES_DATA = [
  'Growing trees and seedlings',
  'Planting trees seedlings and maintaining trees seedlings',
  'Watering trees seedlings until maturity stage',
];

const index = () => {
  return (
    <>
      <div className="container">
        <nav className="navigation">
          <a className="navigation__logo" href="/">
            Manual Jobs
          </a>
          <div className="navigation__links">
            <a className="navigation__links__link" href="/login">
              Admin Login
            </a>
          </div>
        </nav>
        <header className="heading">
          <h1 className="heading__heading-text">
            Manual Jobs Services Limited
          </h1>
          <div className="heading__goals">
            <div className="heading__goals__content">
              <h2 className="heading__goals__content__heading-text">
                Our Vision
              </h2>
              <p className="heading__goals__content__content-text">
                <q> A Citizen-Centric Public Service </q>
              </p>
            </div>
            <div className="heading__goals__content">
              <h2 className="heading__goals__content__heading-text">
                Our Mission
              </h2>
              <p className="heading__goals__content__content-text">
                To reform and transform our ecosystem through environment
                conservancy and trees planting project
              </p>
            </div>
          </div>
        </header>
        <div className="description-section">
          <h2>
            We are looking towards employing 600-900 youths from every county to
            our Kazi Mtaani trees planting initiative
          </h2>
          <p className="description-section__content-text">
            Manual jobs services commission (MJSC) in partnership with National
            Government is pleased to announce recruitment of 600-900 youths from
            every county to our kazi mtaani trees planting programme. Qualified
            individuals are supposed to engage in our forum of plant trees
            around our major, local towns, cities and also around major forested
            regions. MJSC is focused on conserving our ecosystem as per THE
            WORLD CLIMATE PROGRAMME(WCP).
          </p>
          <div className="description-section__content">
            <h3 className="description-section__content__heading-text">
              Requirements For Application:
            </h3>
            <p className="description-section__content__content-text">
              For an appointment to our trees planting programme, a candidate
              must;
            </p>
            <div className="description-section__content__content-list">
              <ul>
                {REQUIREMENTS_DATA.map((requirement) => (
                  <li>{requirement}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="description-section__content">
            <h3 className="description-section__content__heading-text">
              Duties And Responsibilities
            </h3>
            <p>Duties include, but not limited to;</p>
            <div className="description-section__content__content-list">
              <ul>
                {RESPONSIBILITIES_DATA.map((responsibility) => (
                  <li>{responsibility}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="description-section__content">
            <h3 className="description-section__content__heading-text">
              Stipends
            </h3>
            <p>
              Those qualified candidates will receive a salary of 9000 per
              month. They must be willing to work 4 days a week under minimal
              supervision.
            </p>
          </div>
        </div>
        <div className="extra-info-section">
          <p className="extra-info-section__content-text">
            Interested members should submit their documents through our
            commissions portal accessible through;
          </p>
          <a
            className="extra-info-section__portal-btn"
            href="/application-form-submit"
          >
            Submit It Here
          </a>
          <p className="extra-info-section__content-text content-text--bold">
            Before 25th September 2023
          </p>
          <p className="extra-info-section__note">First Come First Served.</p>
        </div>
      </div>
    </>
  );
};

export default index;
