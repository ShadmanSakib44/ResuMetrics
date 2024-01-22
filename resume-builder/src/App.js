import React from 'react';
import styled from 'styled-components';
import { useReactToPrint } from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

// Import necessary components and styles
import { Header, Footer, Avatar, Range, Title, Descr } from './components';

// Styled components for layout and styling
const A4Width = '8.27in'; /* A4 width in inches */
const A4Height = '11.69in'; /* A4 height in inches */

const PageContainer = styled.div`
  background-color: #D2E3C8; /* Set the background color of the entire page */
  min-height: 100vh; /* Ensure the container covers the full viewport height */
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: ${A4Width};
  height: ${A4Height};
  margin: 2rem auto;
  padding: 1.5rem; /* Adjust padding to center content within the page */
  background-color: white;
  border: 1px solid #ececec;
  box-shadow: 5px 7px 10px 4px #ececec;
  border-radius: 14px;
  box-sizing: border-box; /* Include padding and border in the total width/height */
  display: flex;
  flex-direction: column;
`;

const Row = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: ${(props) => (props.itemsCenter ? 'center' : 'start')};
  margin: 1rem 0;
`;

const Sidebar = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const Content = styled.div`
  flex: 3;
  margin-left: 1rem;
`;

const RemoveButton = styled.button`
  display: none;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 0.5rem;
`;

const SectionContainer = styled.div`
  position: relative;
  &:hover ${RemoveButton} {
    display: block;
  }
`;

const BoldTitle = styled(Title)`
  font-weight: bold;
`;

const App = () => {
  // State for skills, work experience, education, language, and achievements counters
  const [skillsCounter, setSkillsCounter] = React.useState(1);
  const [worksCounter, setWorksCounter] = React.useState(1);
  const [educationCounter, setEducationCounter] = React.useState(1);
  const [languageCounter, setLanguageCounter] = React.useState(1);
  const [achievementsCounter, setAchievementsCounter] = React.useState(1);

  // Ref for printing
  const componentRef = React.useRef();
  const handlePrintClick = useReactToPrint({
    content: () => componentRef.current,
  });

  // Function to remove a section
  const removeSection = (sectionType) => {
    switch (sectionType) {
      case 'skills':
        if (skillsCounter > 1) {
          setSkillsCounter(skillsCounter - 1);
        }
        break;
      case 'works':
        if (worksCounter > 1) {
          setWorksCounter(worksCounter - 1);
        }
        break;
      case 'education':
        if (educationCounter > 1) {
          setEducationCounter(educationCounter - 1);
        }
        break;
      case 'language':
        if (languageCounter > 1) {
          setLanguageCounter(languageCounter - 1);
        }
        break;
      case 'achievements':
        if (achievementsCounter > 1) {
          setAchievementsCounter(achievementsCounter - 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <PageContainer>
      <div className='ui-wrapper'>
        {/* Header component with print button */}
        <Header onClick={handlePrintClick} />
        <div className='ui-content-wrapper'>
          <Wrapper ref={componentRef}>
            {/* Header section with profile picture and name */}
            <Row itemsCenter>
              <Sidebar>
                <Avatar />
              </Sidebar>
              <Content>
                <BoldTitle>Name</BoldTitle>
                <Descr>Experienced in .....</Descr>
              </Content>
            </Row>

            {/* Contact information section */}
            <Row>
              <Sidebar>
                <BoldTitle size='3' isUppercase>
                  Contact Information:
                </BoldTitle>
                <Descr isSecondary>Address</Descr>
                <Descr isPrimary>
                  <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '0.6rem' }} />
                  resumetrics@example.com
                </Descr>
                <Descr isPrimary>
                  <FontAwesomeIcon icon={faPhone} style={{ marginRight: '0.6rem' }} />
                  +8801600000000
                </Descr>
              </Sidebar>

              {/* Education section */}
              <Content>
                <BoldTitle
                  size='3'
                  isUppercase
                  isShowButton
                  onClick={() => setEducationCounter(educationCounter + 1)}
                  style={{ marginTop: '2rem' }}
                >
                  Education:
                </BoldTitle>
                {new Array(educationCounter).fill(1).map((_, i) => (
                  <SectionContainer key={i}>
                    <Descr>Degree {i + 1}: Your Education Details</Descr>
                    {i > 0 && (
                      <RemoveButton onClick={() => removeSection('education')}>
                        Remove Education
                      </RemoveButton>
                    )}
                  </SectionContainer>
                ))}

                {/* Work experience section */}
                <BoldTitle
                  size='3'
                  isUppercase
                  isShowButton
                  onClick={() => setWorksCounter(worksCounter + 1)}
                  style={{ marginTop: '2rem' }}
                >
                  Work Experience:
                </BoldTitle>
                {new Array(worksCounter).fill(1).map((_, i) => (
                  <SectionContainer key={i}>
                    <Descr>{i + 1}. XYZ Company.</Descr>
                    {i > 0 && (
                      <RemoveButton onClick={() => removeSection('works')}>
                        Remove Work Experience
                      </RemoveButton>
                    )}
                  </SectionContainer>
                ))}

                {/* Skills section */}
                <BoldTitle
                  size='3'
                  isUppercase
                  isShowButton
                  onClick={() => setSkillsCounter(skillsCounter + 1)}
                  style={{ marginTop: '2rem' }}
                >
                  Skills:
                </BoldTitle>
                {new Array(skillsCounter).fill(1).map((_, i) => (
                  <SectionContainer key={i}>
                    <Range />
                    {i > 0 && (
                      <RemoveButton onClick={() => removeSection('skills')}>
                        Remove Skill
                      </RemoveButton>
                    )}
                  </SectionContainer>
                ))}

                {/* Language section */}
                <BoldTitle
                  size='3'
                  isUppercase
                  isShowButton
                  onClick={() => setLanguageCounter(languageCounter + 1)}
                  style={{ marginTop: '2rem' }}
                >
                  Languages:
                </BoldTitle>
                {new Array(languageCounter).fill(1).map((_, i) => (
                  <SectionContainer key={i}>
                    <Descr>Language {i + 1}: Your Language Details</Descr>
                    {i > 0 && (
                      <RemoveButton onClick={() => removeSection('language')}>
                        Remove Language
                      </RemoveButton>
                    )}
                  </SectionContainer>
                ))}

                {/* Achievements section */}
                <BoldTitle
                  size='3'
                  isUppercase
                  isShowButton
                  onClick={() => setAchievementsCounter(achievementsCounter + 1)}
                  style={{ marginTop: '2rem' }}
                >
                  Achievements:
                </BoldTitle>
                {new Array(achievementsCounter).fill(1).map((_, i) => (
                  <SectionContainer key={i}>
                    <Descr>Achievement {i + 1}: Your Achievement Details</Descr>
                    {i > 0 && (
                      <RemoveButton onClick={() => removeSection('achievements')}>
                        Remove Achievement
                      </RemoveButton>
                    )}
                  </SectionContainer>
                ))}
              </Content>
            </Row>
          </Wrapper>
        </div>
        {/* Footer component */}
        <Footer />
      </div>
    </PageContainer>
  );
};

export default App;
