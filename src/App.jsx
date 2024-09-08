import { PureComponent } from 'react';
import './App.css';
import jsPDF from 'jspdf';

export default class PdfGenerator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  jsPdfGenerator = () => {
    // new document
    var doc = new jsPDF('p', 'pt');

    // text
    doc.text(20, 20, 'This is default text');
    
    // set the font
    doc.setFont('courier');
    
    // additional text
    doc.text(20, 30, 'This is my second courier text');
    
    // save the doc
    doc.save("generated.pdf");
  };

  // render
  render() {
    return (
      <>
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                Question Paper Generator
                <br className="hidden lg:inline-block" /> Made with Love ❤
              </h1>
              <p className="mb-8 leading-relaxed">
              This Tool is specially built to help teachers to generate their own question papers effeciently.
              </p>
              <div className="flex justify-center">
                <button
                  className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={this.jsPdfGenerator}
                >
                  Generate a demo
                </button>
                <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
Try Yourself                 </button>
              </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src="https://dummyimage.com/720x600"
              />
            </div>
          </div>
        </section>
      </>
    );
  }
}
