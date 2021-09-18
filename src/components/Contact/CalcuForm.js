import React from "react"
import { useForm } from "react-hook-form"
import tw, { styled } from "twin.macro"

const FormTitle = styled.h4`
  ${tw`font-bold text-xl mb-4`}
`

const FormContainer = styled.div`
  ${tw`flex flex-col justify-between`};

  & p {
    ${tw`font-bold`}
  }

  input,
  select {
    padding: 10px;
    border: 1px solid ${props => props.theme.colors.gray};
  }

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`

const CalcuForm = () => {
  const { register, watch, errors } = useForm({
    mode: "onChange",
  })

  let thickness = []
  let weight = 0

  const materialLists = [
    {
      materialValue: "glazed",
      materialName: "Glazed Tile",
    },
    {
      materialValue: "quarry",
      materialName: "Quarry Tile",
    },
    {
      materialValue: "porcelain",
      materialName: "Porcelain Tile",
    },
    {
      materialValue: "granite",
      materialName: "Granite",
    },
    {
      materialValue: "marble",
      materialName: "Marble",
    },
  ]

  const material = watch("material")
  const width = watch("width")
  const length = watch("length")
  const thicknessValue = watch("thicknessValue")

  if (material === "glazed" && thicknessValue === "6") {
    weight = (parseInt(width) * parseInt(length) * 10.06) / 1000000
  } else if (material === "glazed" && thicknessValue === "8") {
    weight = (parseInt(width) * parseInt(length) * 13.42) / 1000000
  } else if (material === "glazed" && thicknessValue === "10") {
    weight = (parseInt(width) * parseInt(length) * 16.77) / 1000000
  } else if (material === "glazed" && thicknessValue === "12") {
    weight = (parseInt(width) * parseInt(length) * 20.12) / 1000000
  } else if (material === "quarry" && thicknessValue === "12") {
    weight = (parseInt(width) * parseInt(length) * 22.2) / 1000000
  } else if (material === "porcelain" && thicknessValue === "10") {
    weight = (parseInt(width) * parseInt(length) * 19.68) / 1000000
  } else if (material === "porcelain" && thicknessValue === "12") {
    weight = (parseInt(width) * parseInt(length) * 23.62) / 1000000
  } else if (material === "granite" && thicknessValue === "20") {
    weight = (parseInt(width) * parseInt(length) * 60) / 1000000
  } else if (material === "granite" && thicknessValue === "25") {
    weight = (parseInt(width) * parseInt(length) * 75) / 1000000
  } else if (material === "granite" && thicknessValue === "30") {
    weight = (parseInt(width) * parseInt(length) * 90) / 1000000
  } else if (material === "granite" && thicknessValue === "40") {
    weight = (parseInt(width) * parseInt(length) * 120) / 1000000
  } else if (material === "granite" && thicknessValue === "50") {
    weight = (parseInt(width) * parseInt(length) * 150) / 1000000
  } else if (material === "marble" && thicknessValue === "20") {
    weight = (parseInt(width) * parseInt(length) * 53) / 1000000
  } else {
    weight = 0
  }

  //console.log(thickness)

  switch (material) {
    case "glazed":
      thickness = [6, 8, 10, 12]
      break
    case "quarry":
      thickness = [12]
      break
    case "porcelain":
      thickness = [10, 12]
      break
    case "granite":
      thickness = [20, 25, 30, 40, 50]
      break
    case "marble":
      thickness = [20]
    default:
      thickness = [20]
      break
  }

  return (
    <div>
      <FormTitle>Weight Calculator</FormTitle>
      <FormContainer>
        <select ref={register} name="material">
          <option value="">Select Material</option>
          {materialLists.map((list, index) => (
            <option value={list.materialValue} key={index}>
              {list.materialName}
            </option>
          ))}
        </select>

        <select ref={register} name="thicknessValue">
          <option value="">Select Thickness (in mm)</option>
          {thickness.map((thick, index) => (
            <option value={thick} key={index}>
              {thick}
            </option>
          ))}
        </select>

        <input
          name="length"
          type="number"
          placeholder="Enter length (in mm)"
          ref={register({
            pattern: { value: /^[0-9]*$/, message: "numbers only" },
          })}
        />
        {errors.length && errors.length.message && (
          <p>{errors.length.message}</p>
        )}

        <input
          name="width"
          type="number"
          placeholder="Enter width (in mm)"
          ref={register({
            pattern: { value: /^[0-9]*$/, message: "numbers only" },
          })}
        />

        {errors.width && errors.width.message && <p>{errors.width.message}</p>}

        <p>weight: {`${weight ? weight : 0} KG`} </p>
      </FormContainer>
    </div>
  )
}

export default CalcuForm
