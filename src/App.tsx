import { Form, Input, Button, List, Card } from "antd";
import { useState } from "react";
function App() {
  let epsilon: number = 0;
  let x1: number = 0;
  let x2: number = 0;
  let alpha: number = 0;
  let iteration: number = 0;

  const [showX1, setShowX1] = useState(0);
  const [showX2, setShowX2] = useState(0);
  const [showIteration, setShowIteration] = useState(0);

  const calculateGradient = (x: number[]) => {
    let g: number[] = [];
    g[0] = 2 * x[0] - 2 * x[1];
    g[1] = 2 * x[1] - 2 * x[0];

    return g;
  };

  const calculateAmplitude = (x: number[]) => {
    let amplitude = Math.sqrt(x[0] * x[0] + x[1] * x[1]);
    return amplitude;
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form style={{ margin: 90 }}>
          <h2>Steepest Descent Algorithm</h2>
          <Form.Item>
            <Input
              type="number"
              onChange={(event) => {
                epsilon = Number(event.target.value);
              }}
              placeholder="Epsilon"
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="number"
              onChange={(event) => {
                x1 = Number(event.target.value);
              }}
              placeholder="x1"
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="number"
              onChange={(event) => {
                x2 = Number(event.target.value);
              }}
              placeholder="x2"
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="number"
              onChange={(event) => {
                alpha = Number(event.target.value);
              }}
              placeholder="Alpha"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                let x: number[] = [x1, x2];
                let g: number[] = calculateGradient(x);
                let d: number[] = [2];

                let iteration_max: number = 100;

                while (
                  calculateAmplitude(g) > epsilon &&
                  iteration < iteration_max
                ) {
                  d[0] = -g[0];
                  d[1] = -g[1];

                  x[0] = x[0] + alpha * d[0];
                  x[1] = x[1] + alpha * d[1];

                  iteration++;
                  g = calculateGradient(x);
                }
                setShowX1(x[0]);
                setShowX2(x[1]);
                setShowIteration(iteration);
                console.log(
                  `x1 = ${x[0]}, x2 = ${x[1]}, iteration = ${iteration}`
                );
              }}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <List>
              <List.Item>
                <Card title="X1" bordered={false}>
                  {showX1}
                </Card>
                <Card title="X2" bordered={false}>
                  {showX2}
                </Card>
                <Card title="Iteration" bordered={false}>
                  {showIteration}
                </Card>
              </List.Item>
            </List>
          </Form.Item>
        </Form>
      </header>
    </div>
  );
}

export default App;
