import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { ChartConfig } from '../../types';

interface Chart3DProps {
  config: ChartConfig;
  data: any[];
}

const Chart3D: React.FC<Chart3DProps> = ({ config, data }) => {
  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      x: typeof item[config.xAxis] === 'number' ? item[config.xAxis] : index,
      y: typeof item[config.yAxis] === 'number' ? item[config.yAxis] : 0,
      z: config.zAxis && typeof item[config.zAxis] === 'number' ? item[config.zAxis] : index,
      label: item[config.xAxis]?.toString() || `Point ${index}`,
    }));
  }, [data, config]);

  const ScatterPoints = () => {
    return (
      <group>
        {chartData.map((point, index) => (
          <mesh key={index} position={[point.x / 100, point.y / 1000, point.z / 100]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={`hsl(${(index * 360) / chartData.length}, 70%, 50%)`} />
          </mesh>
        ))}
      </group>
    );
  };

  const BarChart3D = () => {
    return (
      <group>
        {chartData.map((point, index) => {
          const height = point.y / 1000;
          return (
            <mesh key={index} position={[index - chartData.length / 2, height / 2, 0]}>
              <boxGeometry args={[0.8, height, 0.8]} />
              <meshStandardMaterial color={`hsl(${(index * 360) / chartData.length}, 70%, 50%)`} />
            </mesh>
          );
        })}
      </group>
    );
  };

  const renderChart = () => {
    switch (config.chartType) {
      case 'scatter3d':
        return <ScatterPoints />;
      case 'bar3d':
        return <BarChart3D />;
      default:
        return <ScatterPoints />;
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 rounded-lg">
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enablePan enableZoom enableRotate />
        
        {/* Axes */}
        <group>
          {/* X Axis */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, 20]} />
            <meshStandardMaterial color="red" />
          </mesh>
          <Text position={[10, 0, 0]} fontSize={0.5} color="red">
            {config.xAxis}
          </Text>
          
          {/* Y Axis */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 20]} />
            <meshStandardMaterial color="green" />
          </mesh>
          <Text position={[0, 10, 0]} fontSize={0.5} color="green">
            {config.yAxis}
          </Text>
          
          {/* Z Axis */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 20]} />
            <meshStandardMaterial color="blue" />
          </mesh>
          <Text position={[0, 0, 10]} fontSize={0.5} color="blue">
            {config.zAxis || 'Z'}
          </Text>
        </group>

        {renderChart()}
      </Canvas>
    </div>
  );
};

export default Chart3D;