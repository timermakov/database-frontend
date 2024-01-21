import React from 'react'
import {useState} from "react";
import vtLogo from './icons/vt.png'

import './App.css';
import HeroTable from "./tables/HeroTable";
import UnitTable from "./tables/UnitTable";
import RaceTable from "./tables/RaceTable";
import HealthTable from "./tables/HealthTable";
import DamageTable from "./tables/DamageTable";
import BuildingTable from "./tables/BuildingTable";
import MapTable from "./tables/MapTable";
import ResourceTable from "./tables/ResourceTable";
import ResourceTypeTable from "./tables/ResourceTypeTable";
import ObstacleTable from "./tables/ObstacleTable";


function App() {

  const [component, setComponent] = useState('');

  const handleClickHeroes = () => {
    setComponent('HeroTable');
  };

  const handleClickUnits = () => {
    setComponent('UnitTable');
  };

  const handleClickHealths = () => {
    setComponent('HealthTable');
  };

  const handleClickDamages = () => {
    setComponent('DamageTable');
  };

  const handleClickRaces = () => {
    setComponent('RaceTable');
  };

  const handleClickBuildings = () => {
    setComponent('BuildingTable');
  };

  const handleClickMaps = () => {
    setComponent('MapTable');
  };

  const handleClickResources = () => {
    setComponent('ResourceTable');
  };

  const handleClickResourcesTypes = () => {
    setComponent('ResourceTypeTable');
  };

  const handleClickObstacles = () => {
    setComponent('ObstacleTable');
  };

  let ComponentToRender;

  switch(component) {
    case 'HeroTable':
      ComponentToRender = <HeroTable />;
      break;
    case 'UnitTable':
      ComponentToRender = <UnitTable />;
      break;
    case 'RaceTable':
      ComponentToRender = <RaceTable />;
      break;
    case 'HealthTable':
      ComponentToRender = <HealthTable />;
      break;
    case 'DamageTable':
      ComponentToRender = <DamageTable />;
      break;
    case 'BuildingTable':
      ComponentToRender = <BuildingTable />;
      break;
    case 'MapTable':
      ComponentToRender = <MapTable />;
      break;
    case 'ResourceTable':
      ComponentToRender = <ResourceTable/>;
      break;
    case 'ResourceTypeTable':
      ComponentToRender = <ResourceTypeTable/>;
      break;
    case 'ObstacleTable':
      ComponentToRender = <ObstacleTable />;
      break;
    default:
      ComponentToRender = null;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={vtLogo} className="vt-logo" alt="logo" />
        <p>
          Ермаков Тимофей Сергеевич, P33092, ИСУ 311733
          <br/>
          Гадеев Руслан Рустамович, P33082, ИСУ 311731
        </p>
      </header>
      <div className="sidenav">
        <HeroesButton onClick={handleClickHeroes}></HeroesButton>
        <UnitsButton onClick={handleClickUnits}></UnitsButton>
        <HealthButton onClick={handleClickHealths}></HealthButton>
        <DamageButton onClick={handleClickDamages}></DamageButton>
        <RacesButton onClick={handleClickRaces}></RacesButton>
        <BuildingsButton onClick={handleClickBuildings}></BuildingsButton>
        <MapsButton onClick={handleClickMaps}></MapsButton>
        <ResourcesButton onClick={handleClickResources}></ResourcesButton>
        <ResourcesTypesButton onClick={handleClickResourcesTypes}></ResourcesTypesButton>
        <ObstaclesButton onClick={handleClickObstacles}></ObstaclesButton>
      </div>
      <div className="div-table">
        {ComponentToRender}
      </div>
    </div>
  );

  function HeroesButton({onClick}) {
    return (
        <button onClick={onClick}>Heroes</button>
    );
  }

  function UnitsButton({onClick}) {
    return (
        <button onClick={onClick}>Units</button>
    );
  }

  function HealthButton({onClick}) {
    return (
        <button onClick={onClick}>Health</button>
    );
  }

  function DamageButton({onClick}) {
    return (
        <button onClick={onClick}>Damage</button>
    );
  }

  function RacesButton({onClick}) {
    return (
        <button onClick={onClick}>Races</button>
    );
  }

  function BuildingsButton({onClick}) {
    return (
        <button onClick={onClick}>Buildings</button>
    );
  }

  function MapsButton({onClick}) {
    return (
        <button onClick={onClick}>Maps</button>
    );
  }

  function ResourcesButton({onClick}) {
    return (
        <button onClick={onClick}>Resources</button>
    );
  }

  function ResourcesTypesButton({onClick}) {
    return (
        <button onClick={onClick}>Resources Types</button>
    );
  }

  function ObstaclesButton({onClick}) {
    return (
        <button onClick={onClick}>Obstacles</button>
    );
  }

}
export default App;
