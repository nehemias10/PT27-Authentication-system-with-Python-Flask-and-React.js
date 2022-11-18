const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		login: false, // Para chequear estado de login, validación de token
		message: null,
		user: null,
		registro: [],
		registros: [],
	   
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white",
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white",
		  },
		],
	  },
	  actions: {
		//VALIDACIÓN DE TOKEN PARA ACCEDER A PAGINAS PROTEGIDAS
		GetValidacion: (token_por_validar) => {
		  var myHeaders = new Headers();
		  myHeaders.append("Authorization", "Bearer " + token_por_validar);
  
		  var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		  };
  
		  fetch(
			"https://3001-4geeksacade-reactflaskh-lpc7fkc70d9.ws-us74.gitpod.io/api/validartoken",
			requestOptions
		  )
			.then((response) => response.json())
			.then((result) => {
			  console.log(result);
			  if (result.mensaje === "inicio correcto") {
				setStore({ login: true });
			  }
			})
			.catch((error) => {
			  console.log("error", error);
			});
		},
  
		Register: (name, email, password, direccion, telefono) => {
		  var myHeaders = new Headers();
		  myHeaders.append("Content-Type", "application/json");
  
		  var raw = JSON.stringify({
			name: name,
			email: email,
			password: password,
			telefono: telefono,
			direccion: direccion,
		  });
		  var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		  };
  
		  fetch(
			"https://3001-4geeksacade-reactflaskh-lpc7fkc70d9.ws-us74.gitpod.io/api/registro",
			requestOptions
		  )
			.then((response) => response.json())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
		},
  
		GetValidacion: (token_por_validar) => {
		  var myHeaders = new Headers();
		  myHeaders.append("Authorization", "Bearer " + token_por_validar);
  
		  var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		  };
  
		  fetch(
			"https://3001-4geeksacade-reactflaskh-lpc7fkc70d9.ws-us74.gitpod.io/validartoken",
			requestOptions
		  )
			.then((response) => response.json())
			.then((result) => {
			  console.log(result);
			  if (result.mensaje === "inicio correcto") {
				setStore({ login: true });
			  }
			})
			.catch((error) => {
			  console.log("error", error);
			});
		},
  
  
		Login: (email, password) => {
		  var myHeaders = new Headers();
		  myHeaders.append("Content-Type", "application/json");
  
		  var raw = JSON.stringify({
			email: email,
			password: password,
		  });
  
		  var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		  };
  
		  fetch(
			"https://3001-4geeksacade-reactflaskh-lpc7fkc70d9.ws-us74.gitpod.io/api/token",
			requestOptions
		  )
			.then((response) => response.json())
			.then((data) => {
			  console.log(data);
			  if (data) {
				localStorage.setItem("user", JSON.stringify(data));
				window.location.href = "/privado";
			  }
			  else {
			  }
  
			  if (data.token) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("token_userEmail", data.email);
				localStorage.setItem("token_userID", data.id);
				window.location.href = "/privado";
			  } else {
			  }
			})
			.catch((error) => console.log("error", error));
		},
  
	   
	   
		getRegistro: (id) => {
		  fetch(
			"https://3001-4geeksacade-reactflaskh-lpc7fkc70d9.ws-us74.gitpod.io/api/usuarios" +
			  id
		  )
			.then((response) => response.json())
			.then((result) => {
			  setStore({ registro: result.result });
			})
			.catch((error) => console.log("DANGER", error));
		},
  
		getRegistros: () => {
		  fetch(
			"https://3001-4geeksacade-reactflaskh-lpc7fkc70d9.ws-us74.gitpod.io/api/usuarios"
		  )
			.then((response) => response.json())
			.then((result) => {
			  console.log(result);
			  setStore({ registros: result.usuarios });
			})
			.catch((error) => console.log("DANGER", error));
		},
	   
	  
		
	   
	  
		changeColor: (index, color) => {
		  //get the store
		  const store = getStore();
  
		  //we have to loop the entire demo array to look for the respective index
		  //and change its color
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
  
		  //reset the global store
		  setStore({ demo: demo });
		},
	  },
	};
  };
  
  export default getState;
  