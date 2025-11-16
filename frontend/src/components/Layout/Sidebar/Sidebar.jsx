

// File: Sidebar.jsx
import React from "react";

export default function Sidebar({ modes, toggleMode, featureParams, setFeatureParams }) {
  const { ARMode, MapMode, DebugMode } = modes;

  const buttonClass = (isActive) =>
    `w-full text-left px-4 py-2 mb-2 rounded-lg transition-colors ${
      isActive
        ? "bg-green-600 hover:bg-green-500"
        : "bg-gray-700 hover:bg-gray-600"
  }`;

  /** Update a specific field of a feature's parameters */
  const handleInputChange = (featureKey, field, value) => {
    setFeatureParams((prev) => ({
      ...prev,
      [featureKey]: {
        ...prev[featureKey],
        [field]: field === "color" ? value : Number(value),
      },
    }));
  };

  /** Toggle rotation on/off */
  const toggleRotation = (featureKey) => {
    setFeatureParams((prev) => ({
      ...prev,
      [featureKey]: {
        ...prev[featureKey],
        rotating: !prev[featureKey]?.rotating,
      },
    }));
  };

  /** Render parameter controls for a specific feature */
  const renderFeatureInputs = (featureKey) => {


    if (featureKey === "Augmented Shape") {
      const params = featureParams?.[featureKey] || {
        showShape: true,
        x: 0,
        y: 0,
        z: 0,
        w: 1,
        h: 1,
        d: 1,
        color: "#40E0D0",
        opacity: 1,
        orientation: false,
        rotating: false,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        rotationSpeedX: 0,
        rotationSpeedY: 0,
        rotationSpeedZ: 90,
      };

      const limits = {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 },
        z: { min: -10, max: 10 },
        w: { min: 0.1, max: 10 },
        h: { min: 0.1, max: 10 },
        d: { min: 0.1, max: 10 },
        opacity: { min: 0, max: 1 },
        rotationX: { min: 0, max: 360 },
        rotationY: { min: 0, max: 360 },
        rotationZ: { min: 0, max: 360 },
        rotationSpeedX: { min: -360, max: 360 },
        rotationSpeedY: { min: -360, max: 360 },
        rotationSpeedZ: { min: -360, max: 360 },
      };

      return (
        <div className="w-58 ml-0 mb-2 flex flex-col space-y-2 bg-gray-700 p-2 rounded">

          {/* Show/Hide Shape */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={params.showShape}
              onChange={() =>
                setFeatureParams(prev => ({
                  ...prev,
                  'Augmented Shape': {
                    ...prev['Augmented Shape'],
                    showShape: !prev['Augmented Shape'].showShape
                  }
                }))
              }
            />
            <span>Show Augmented Shape</span>
          </label>

          {params.showShape && (
            <>
              {/* Position sliders */}
              {['x','y','z'].map(axis => (
                <div key={axis} className="flex flex-col">
                  <label className="text-sm">{axis.toUpperCase()}: {params[axis].toFixed(2)}</label>
                  <input
                    type="range"
                    min={limits[axis].min}
                    max={limits[axis].max}
                    step="0.1"
                    value={params[axis]}
                    onChange={(e) =>
                      setFeatureParams(prev => ({
                        ...prev,
                        'Augmented Shape': {
                          ...prev['Augmented Shape'],
                          [axis]: Number(e.target.value)
                        }
                      }))
                    }
                  />
                </div>
              ))}

              {/* Size sliders */}
              {['w','h','d'].map(dim => (
                <div key={dim} className="flex flex-col">
                  <label className="text-sm">{dim.toUpperCase()}: {params[dim].toFixed(2)}</label>
                  <input
                    type="range"
                    min={limits[dim].min}
                    max={limits[dim].max}
                    step="0.1"
                    value={params[dim]}
                    onChange={(e) =>
                      setFeatureParams(prev => ({
                        ...prev,
                        'Augmented Shape': {
                          ...prev['Augmented Shape'],
                          [dim]: Number(e.target.value)
                        }
                      }))
                    }
                  />
                </div>
              ))}

              {/* Color picker */}
              <div className="flex flex-col mt-2">
                <label className="text-sm">Color:</label>
                <input
                  type="color"
                  value={params.color}
                  onChange={(e) =>
                    setFeatureParams(prev => ({
                      ...prev,
                      'Augmented Shape': {
                        ...prev['Augmented Shape'],
                        color: e.target.value
                      }
                    }))
                  }
                />
              </div>

              {/* Opacity slider */}
              <div className="flex flex-col mt-2">
                <label className="text-sm">Opacity: {params.opacity.toFixed(2)}</label>
                <input
                  type="range"
                  min={limits.opacity.min}
                  max={limits.opacity.max}
                  step="0.01"
                  value={params.opacity}
                  onChange={(e) =>
                    setFeatureParams(prev => ({
                      ...prev,
                      'Augmented Shape': {
                        ...prev['Augmented Shape'],
                        opacity: Number(e.target.value)
                      }
                    }))
                  }
                />
              </div>


              {/* Orientation Rotation toggles */}
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={params.orientation}
                  onChange={() =>
                    setFeatureParams(prev => ({
                      ...prev,
                      'Augmented Shape': {
                        ...prev['Augmented Shape'],
                        orientation: !prev['Augmented Shape'].orientation
                      }
                    }))
                  }
                />
                <span>Orientation Rotate</span>
              </label>

              {/* Rotation toggles */}
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={params.rotating}
                  onChange={() =>
                    setFeatureParams(prev => ({
                      ...prev,
                      'Augmented Shape': {
                        ...prev['Augmented Shape'],
                        rotating: !prev['Augmented Shape'].rotating
                      }
                    }))
                  }
                />
                <span>Rotate Shape</span>
              </label>

              {/* Rotation sliders */}
              {params.rotating && (
                <>
                  {['rotationX','rotationY','rotationZ'].map(axis => (
                    <div key={axis} className="flex flex-col mt-2">
                      <label className="text-sm">{axis}: {params[axis].toFixed(0)}°</label>
                      <input
                        type="range"
                        min={limits[axis].min}
                        max={limits[axis].max}
                        step="1"
                        value={params[axis]}
                        onChange={(e) =>
                          setFeatureParams(prev => ({
                            ...prev,
                            'Augmented Shape': {
                              ...prev['Augmented Shape'],
                              [axis]: Number(e.target.value)
                            }
                          }))
                        }
                      />
                    </div>
                  ))}

                  {['rotationSpeedX','rotationSpeedY','rotationSpeedZ'].map(axis => (
                    <div key={axis} className="flex flex-col mt-2">
                      <label className="text-sm">{axis} speed: {params[axis]}°/s</label>
                      <input
                        type="range"
                        min={limits[axis].min}
                        max={limits[axis].max}
                        step="1"
                        value={params[axis]}
                        onChange={(e) =>
                          setFeatureParams(prev => ({
                            ...prev,
                            'Augmented Shape': {
                              ...prev['Augmented Shape'],
                              [axis]: Number(e.target.value)
                            }
                          }))
                        }
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      );
    }

    if (featureKey === "Joystick Widget") {

      const joy = featureParams['Joystick Widget'];

      return (

        <div className="space-y-4 p-4">

          {/* Toggle joystick visibility */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={joy.showJoystick}
                onChange={() =>
                  setFeatureParams(prev => ({
                    ...prev,
                    'Joystick Widget': {
                      ...prev['Joystick Widget'],
                      showJoystick: !prev['Joystick Widget'].showJoystick
                    }
                  }))
                }
              />
              <span>Show Joystick</span>
            </label>
          </div>

          
          {/* Move Augmented Shape toggle */}
          {joy.showJoystick && (
            <div className="mt-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={joy.moveShape}
                  onChange={() =>
                    setFeatureParams(prev => ({
                      ...prev,
                      'Joystick Widget': {
                        ...prev['Joystick Widget'],
                        moveShape: !prev['Joystick Widget'].moveShape
                      }
                    }))
                  }
                />
                <span>Move Augmented Shape</span>
              </label>
            </div>
          )}


          {/* Design selector */}
          {joy.showJoystick && (
            <div className="mt-3">
              <label className="text-sm font-medium">Joystick Design</label>
              <select
                className="w-full mt-1 bg-gray-800 p-2 rounded"
                value={joy.design}
                onChange={(e) =>
                  setFeatureParams(prev => ({
                    ...prev,
                    'Joystick Widget': {
                      ...prev['Joystick Widget'],
                      design: e.target.value
                    }
                  }))
                }
              >
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
              </select>
            </div>
          )}

          {/* Size slider */}
          {joy.showJoystick && (
            <div className="flex gap-4 ">
              <label className="text-sm">Size: {joy.size}px</label>
              <input
                type="range"
                min="50"
                max="250"
                value={joy.size}
                onChange={(e) =>
                  setFeatureParams(prev => ({
                    ...prev,
                    'Joystick Widget': {
                      ...prev['Joystick Widget'],
                      size: Number(e.target.value)
                    }
                  }))
                }
              />
            </div>
          )}

          {/* Color picker */}
          {joy.showJoystick && (
            <div className="flex item-center gap-4 mt-3">
              <label className="text-sm">Color:</label>
              <input
                type="color"
                className="ml-4"
                value={joy.color}
                onChange={(e) =>
                  setFeatureParams(prev => ({
                    ...prev,
                    'Joystick Widget': {
                      ...prev['Joystick Widget'],
                      color: e.target.value
                    }
                  }))
                }
              />
            </div>
          )}

        </div>
      );
    }

    if (featureKey === "Dashboard Information") {

      const dash = featureParams['Dashboard Information'];

      return (

        <div className="mt-3 space-y-4 pl-2">

          {/* Compass */}
          <div  className="">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={dash.showCompass}
                onChange={() =>
                  setFeatureParams(prev => ({
                    ...prev,
                    'Dashboard Information': {
                      ...prev['Dashboard Information'],
                      showCompass: !prev['Dashboard Information'].showCompass
                    }
                  }))
                }
              />
              <span>Show Compass</span>
            </label>

            {dash.showCompass && (
              <div className="flex mt-1 gap-4">
                <label className="text-sm">Size: {dash.compassSize}px</label>
                <input
                  type="range"
                  min="40"
                  max="200"
                  value={dash.compassSize}
                  onChange={(e) =>
                    setFeatureParams(prev => ({
                      ...prev,
                      'Dashboard Information': {
                        ...prev['Dashboard Information'],
                        compassSize: Number(e.target.value)
                      }
                    }))
                  }
                />
              </div>
            )}
          </div>


          {/* Angular Speed */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={dash.showAngularSpeed}
                onChange={() =>
                  setFeatureParams(prev => ({
                    ...prev,
                    'Dashboard Information': {
                      ...prev['Dashboard Information'],
                      showAngularSpeed: !prev['Dashboard Information'].showAngularSpeed
                    }
                  }))
                }
              />
              <span>Show Angular Speed</span>
            </label>

            {dash.showAngularSpeed && (
              <div className="flex gap-4 mt-1 ">
                <label className="text-sm">Size: {dash.angularSpeedSize}px</label>
                <input
                  type="range"
                  min="40"
                  max="200"
                  value={dash.angularSpeedSize}
                  onChange={(e) =>
                    setFeatureParams(prev => ({
                      ...prev,
                      'Dashboard Information': {
                        ...prev['Dashboard Information'],
                        angularSpeedSize: Number(e.target.value)
                      }
                    }))
                  }
                />
              </div>
            )}
          </div>


          {/* Odometry */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={dash.showOdometry}
                onChange={() =>
                  setFeatureParams(prev => ({
                    ...prev,
                    'Dashboard Information': {
                      ...prev['Dashboard Information'],
                      showOdometry: !prev['Dashboard Information'].showOdometry
                    }
                  }))
                }
              />
              <span>Show Odometry</span>
            </label>

            {dash.showOdometry && (
              <div className="flex gap-4 mt-1">
                <label className="text-sm">Size: {dash.odometrySize}px</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dash.odometrySize}
                  onChange={(e) =>
                    setFeatureParams(prev => ({
                      ...prev,
                      'Dashboard Information': {
                        ...prev['Dashboard Information'],
                        odometrySize: Number(e.target.value)
                      }
                    }))
                  }
                />
              </div>
            )}
          </div>


          {/* Gauge */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={dash.showGauge}
                onChange={() =>
                  setFeatureParams(prev => ({
                    ...prev,
                    'Dashboard Information': {
                      ...prev['Dashboard Information'],
                      showGauge: !prev['Dashboard Information'].showGauge
                    }
                  }))
                }
              />
              <span>Show Speed Gauge</span>
            </label>

            {dash.showGauge && (
              <div className="flex gap-4 mt-1">
                <label className="text-sm">Size: {dash.gaugeSize}px</label>
                <input
                  type="range"
                  min="60"
                  max="240"
                  value={dash.gaugeSize}
                  onChange={(e) =>
                    setFeatureParams(prev => ({
                      ...prev,
                      'Dashboard Information': {
                        ...prev['Dashboard Information'],
                        gaugeSize: Number(e.target.value)
                      }
                    }))
                  }
                />
              </div>
            )}
          </div>

        </div>
      );
    }
    else{

      const params = featureParams?.[featureKey] || {
        x: 0,
        y: 0,
        z: 0,
        w: 1,
        h: 1,
        d: 1,
        color: "#40E0D0", // turquoise
        opacity: 1,
        rotating: false,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
      };

      const limits = {
        x: { min: -10, max: 10 },
        y: { min: -10, max: 10 },
        z: { min: -10, max: 10 },
        w: { min: 0.1, max: 10 },
        h: { min: 0.1, max: 10 },
        d: { min: 0.1, max: 10 },
        opacity: { min: 0, max: 1 },
        rotationX: { min: 0, max: 360 },
        rotationY: { min: 0, max: 360 },
        rotationZ: { min: 0, max: 360 },
      };

      return (
        <div className="w-58 ml-0 mb-2 flex flex-col space-y-2 bg-gray-700 p-2 rounded">
          {/* XYZ Position + WHD Scale */}
          {["x", "y", "z", "w", "h", "d"].map((field) => (
            <div key={field} className="flex items-center space-x-2">
              <label className="w-4 capitalize">{field}:</label>
              <input
                type="range"
                min={limits[field].min}
                max={limits[field].max}
                step={0.1}
                value={params[field]}
                onChange={(e) => handleInputChange(featureKey, field, e.target.value)}
                className="flex-1"
              />
              <span className="w-10 text-right">{params[field]}</span>
            </div>
          ))}

          {/* Rotation Controls */}
          <div className="flex items-center space-x-2">
            <label className="w-16">Rotate:</label>
            <button
              className={`px-2 py-1 rounded ${
                params.rotating ? "bg-green-500" : "bg-gray-600"
              }`}
              onClick={() => toggleRotation(featureKey)}
            >
              {params.rotating ? "ON" : "OFF"}
            </button>
          </div>

          {params.rotating && (
            <>
              {["rotationX", "rotationY", "rotationZ"].map((axis) => (
                <div key={axis} className="flex flex-col space-x-2">
                  <div className="flex justify-between">
                  <label className="w-4 capitalize">{axis}:</label>
                  <span className="w-10 text-right">{params[axis]}</span>

                  </div>
                  <input
                    type="range"
                    min={limits[axis].min}
                    max={limits[axis].max}
                    step={1}
                    value={params[axis]}
                    onChange={(e) => handleInputChange(featureKey, axis, e.target.value)}
                    className="flex-1"
                  />
                </div>
              ))}
            </>
          )}

          {/* Color Picker */}
          <div className="flex items-center space-x-2">
            <label className="w-12">Color:</label>
            <input
              type="color"
              value={params.color}
              onChange={(e) => handleInputChange(featureKey, "color", e.target.value)}
              className="w-16 h-6 p-0 border-0"
            />
          </div>

          {/* Opacity Slider */}
          <div className="flex items-center space-x-1">
            <label className="w-12 text-sm">Opacity:</label>
            <input
              type="range"
              min={limits.opacity.min}
              max={limits.opacity.max}
              step={0.01}
              value={params.opacity}
              onChange={(e) => handleInputChange(featureKey, "opacity", e.target.value)}
              className="flex-1"
            />
            <span className="w-10 text-right">{params.opacity}</span>
          </div>
        </div>
      );

    }
  };

  const featureKeys = modes.features ? Object.keys(modes.features) : [];
  // console.log(modes)

  return (
    <div className="h-min-screen w-72 bg-gray-800 p-2 border-r border-gray-700 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Control Panel</h2>

      <div>
        <button className={buttonClass(MapMode)} onClick={() => toggleMode("MapMode")}>
          Map Mode {MapMode && "✅"}
        </button>
        <button className={buttonClass(DebugMode)} onClick={() => toggleMode("DebugMode")}>
          Debug {DebugMode && "✅"}
        </button>
        <button className={buttonClass(ARMode)} onClick={() => toggleMode("ARMode")}>
          AR Mode {ARMode && "✅"}
        </button>
      </div>

      {/* Sub menue - AR feature */}
      {ARMode && featureKeys.length > 0 && (
        <>
          <hr className="my-3 border-gray-600" />
          <h3 className="text-lg mb-2">AR Features</h3>

          {featureKeys.map((featureKey) => (
            <div key={featureKey}>
              <button onClick={() => toggleMode(featureKey)} className={buttonClass(modes.features[featureKey])}>
                {featureKey.charAt(0).toUpperCase() + featureKey.slice(1)}
              </button>

              {modes.features[featureKey] && renderFeatureInputs(featureKey)}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
