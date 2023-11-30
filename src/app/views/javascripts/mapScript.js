/**
       * @license
       * Copyright 2019 Google LLC. All Rights Reserved.
       * SPDX-License-Identifier: Apache-2.0
       */
      // The following example creates complex markers to indicate beaches near
      // Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
      // to the base of the flagpole.
      function initMap() {
        const map = new google.maps.Map(document.getElementById("mapita"), {
          mapId: "10c889b54d33c4da",
          zoom: 11.75,
          center: { lat: 28.6674057, lng: -106.0576012 },
        });

        setMarkers(map);
      }
      
      // Data for the markers consisting of a name, a LatLng and a zIndex for the
      // order in which these markers should display on top of each other.
      const beaches = [
        ["Recicladora de Papel S.A. de C.V.", 28.652667679251763, -106.06601643311855, 1],
        ["Fierro Viejo y Cartón", 28.651163955122623, -106.06340708182734, 2],
        ["Tecnologías de Reciclado", 28.69310993368951, -106.10049722528184, 3],
        ["Kalisch Recycling 1", 28.69491690242366, -106.11835000809594, 4],
        ["Kalisch Recycling 2", 28.612909810559174, -106.0886353927554, 5],
        ["Chatarra 1", 28.61897953067645, -106.07839638848286, 6],
        ["Metales Reciclados", 28.61837522160605, -106.0535792554501, 7],
        ["Kalisch Recycling 3", 28.615145327276956, -106.02185731779988, 8],
        ["Chatarra 2", 28.596759045805445, -106.02958207959446, 9],
        ["Reduce A.C", 28.609376603882655, -106.00517038009228, 10],
        ["Charly chatarra", 28.60769968975533, -106.00333372893131, 11],
        ["Comercializadora de Chatarra", 28.607171991951837, -105.99951844252341, 12],
        ["RECHISA", 28.606933358189092, -105.9992622004532, 13],
        ["Chatarra La Junta Sucursal Fuentes Mares", 28.60576538160158, -105.99782453645254, 14],
        ["Reciclaje Romero", 28.605068357128907, -105.99784599412419, 15],
        ["Recicladora Lom Moya", 28.606845744164094, -105.9654603300531, 16],
        ["Reci Pet", 28.671043558104014, -106.0645863284326, 17],
        ["Cajas Recicladas Chihuahua", 28.653754700042487, -106.0150956164143, 18],
        ["Recilogic Planta Chihuahua", 28.64597261424409, -106.00583801632348, 19],
      ];

      function setMarkers(map) {
        // Adds markers to the map.
        // Marker sizes are expressed as a Size of X,Y where the origin of the image
        // (0,0) is located in the top left of the image.
        // Origins, anchor positions and coordinates of the marker increase in the X
        // direction to the right and in the Y direction down.
        const image = {
          url:'./images/recycle.png',
          // This marker is 20 pixels wide by 32 pixels high.
          scaledSize: new google.maps.Size(20, 20),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 0),
        };
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        const shape = {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: "poly",
        };

        for (let i = 0; i < beaches.length; i++) {
          const beach = beaches[i];

          new google.maps.Marker({
            position: { lat: beach[1], lng: beach[2] },
            map: map,
            icon: image,
            shape: shape,
            title: beach[0],
            zIndex: beach[3],
          });
        }
        
      }
      window.initMap = initMap;