import { PureComponent } from 'react';
import './App.css';
import jsPDF from 'jspdf';

export default class PdfGenerator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      schoolName: '',
      examTitle: '',
      time: '',
      totalMarks: '',
      questions: [
        {
          type: '',
          question: '',
          marks: '',
          subquestions: ['']
        }
      ]
    };
  }

  handleInputChange = (e, index, subIndex = null) => {
    const { value } = e.target;
    const newQuestions = [...this.state.questions];

    if (subIndex !== null) {
      newQuestions[index].subquestions[subIndex] = value;
    } else {
      const field = e.target.getAttribute('data-field');
      newQuestions[index][field] = value;
    }

    this.setState({ questions: newQuestions });
  };

  addQuestion = () => {
    this.setState((prevState) => ({
      questions: [...prevState.questions, { type: '', question: '', marks: '', subquestions: [''] }]
    }));
  };

  addSubquestion = (index) => {
    const newQuestions = [...this.state.questions];
    newQuestions[index].subquestions.push('');
    this.setState({ questions: newQuestions });
  };

  jsPdfGenerator = () => {
    const { schoolName, examTitle, time, totalMarks, questions } = this.state;
    const doc = new jsPDF('p', 'pt');

    // Header
    doc.setFont('helvetica', 'bold');
    doc.text(20, 40, schoolName);
    doc.setFont('helvetica', 'normal');
    doc.text(20, 60, `Exam: ${examTitle}`);
    doc.text(400, 60, `Time: ${time}`);
    doc.text(400, 80, `Total Marks: ${totalMarks}`);

    // Questions
    let yPosition = 120;
    questions.forEach((q, index) => {
      doc.setFont('courier', 'bold');
      doc.text(20, yPosition, `${index + 1}. (${q.type}) ${q.question} (${q.marks} Marks)`);
      yPosition += 20;
      q.subquestions.forEach((subq, subIndex) => {
        if (subq) {
          doc.setFont('courier', 'normal');
          doc.text(40, yPosition, `${index + 1}.${subIndex + 1} ${subq}`);
          yPosition += 20;
        }
      });
    });

    // Save the PDF
    doc.save('question_paper.pdf');
  };

  render() {
    return (
      <>
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Question Paper Generator
              </h1>

              <input
                className="mb-4 p-2 border border-gray-300"
                name="schoolName"
                placeholder="Enter School Name"
                value={this.state.schoolName}
                onChange={(e) => this.setState({ schoolName: e.target.value })}
              />
              <input
                className="mb-4 p-2 border border-gray-300"
                name="examTitle"
                placeholder="Enter Exam Title"
                value={this.state.examTitle}
                onChange={(e) => this.setState({ examTitle: e.target.value })}
              />
              <input
                className="mb-4 p-2 border border-gray-300"
                name="time"
                placeholder="Enter Exam Time (e.g., 3 hours)"
                value={this.state.time}
                onChange={(e) => this.setState({ time: e.target.value })}
              />
              <input
                className="mb-4 p-2 border border-gray-300"
                name="totalMarks"
                placeholder="Enter Total Marks"
                value={this.state.totalMarks}
                onChange={(e) => this.setState({ totalMarks: e.target.value })}
              />

              {this.state.questions.map((q, index) => (
                <div key={index} className="mb-6">
                  <input
                    className="mb-2 p-2 border border-gray-300"
                    data-field="type"
                    placeholder="Enter Question Type (e.g., MCQ, Short Answer)"
                    value={q.type}
                    onChange={(e) => this.handleInputChange(e, index)}
                  />
                  <input
                    className="mb-2 p-2 border border-gray-300"
                    data-field="question"
                    placeholder="Enter Question"
                    value={q.question}
                    onChange={(e) => this.handleInputChange(e, index)}
                  />
                  <input
                    className="mb-2 p-2 border border-gray-300"
                    data-field="marks"
                    placeholder="Enter Marks for the Question"
                    value={q.marks}
                    onChange={(e) => this.handleInputChange(e, index)}
                  />
                  {q.subquestions.map((subq, subIndex) => (
                    <input
                      key={subIndex}
                      className="mb-2 p-2 border border-gray-300"
                      placeholder={`Enter Subquestion ${subIndex + 1}`}
                      value={subq}
                      onChange={(e) => this.handleInputChange(e, index, subIndex)}
                    />
                  ))}
                  <button
                    className="text-blue-500"
                    onClick={() => this.addSubquestion(index)}
                  >
                    + Add Subquestion
                  </button>
                </div>
              ))}

              <button
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mb-4"
                onClick={this.addQuestion}
              >
                + Add Question
              </button>

              <button
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={this.jsPdfGenerator}
              >
                Generate PDF
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }
}
