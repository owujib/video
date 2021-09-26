import React, { Component } from 'react';
import { View } from 'react-native';
import { VideoPlayer, Trimmer } from 'react-native-video-processing';

class VideoTrimmer extends Component {
  trimVideo() {
    const options = {
      startTime: 0,
      endTime: 15,
      quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
      saveToCameraRoll: true, // default is false // iOS only
      saveWithCurrentDate: true, // default is false // iOS only
    };
    this.videoPlayerRef
      .trim(options)
      .then((newSource) => console.log(newSource))
      .catch(console.warn);
  }

  compressVideo() {
    const options = {
      width: 720,
      height: 1280,
      bitrateMultiplier: 3,
      saveToCameraRoll: true, // default is false, iOS only
      saveWithCurrentDate: true, // default is false, iOS only
      minimumBitrate: 300000,
      removeAudio: true, // default is false
    };
    this.videoPlayerRef
      .compress(options)
      .then((newSource) => console.log(newSource))
      .catch(console.warn);
  }

  getPreviewImageForSecond(second) {
    const maximumSize = { width: 640, height: 1024 }; // default is { width: 1080, height: 1080 } iOS only
    this.videoPlayerRef
      .getPreviewForSecond(second, maximumSize) // maximumSize is iOS only
      .then((base64String) =>
        console.log('This is BASE64 of image', base64String)
      )
      .catch(console.warn);
  }

  getVideoInfo() {
    this.videoPlayerRef
      .getVideoInfo()
      .then((info) => console.log(info))
      .catch(console.warn);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <VideoPlayer
          ref={(ref) => (this.videoPlayerRef = ref)}
          startTime={30} // seconds
          endTime={120} // seconds
          play={true} // default false
          replay={true} // should player play video again if it's ended
          rotate={true} // use this prop to rotate video if it captured in landscape mode iOS only
          source={
            'data:image/jpeg;base64,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'
          }
          playerWidth={300} // iOS only
          playerHeight={500} // iOS only
          style={{ backgroundColor: 'black' }}
          resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
          onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
        />
        <Trimmer
          source={
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRUSFRYWGRYZGhwZFhoaHCEaGBwYGRkZHRwWHBgcLi4lHB4rIxwfJjgmKy8xNTY1HCQ7QDs0QC43NTEBDAwMEA8QHxISHz8lJSs0NDQ0NDE2NzQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0PTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAKoBKAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgMEAQUH/8QAOhAAAgIBAwIEAwYEBQQDAAAAAQIAESEDEjEEQSIyUXFhgZEFE0JSscEUI3KhFWKC0fAkM7LxQ1Ph/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EACARAQEBAAICAwEBAQAAAAAAAAABEQIhMVESQWGh4SL/2gAMAwEAAhEDEQA/APnfTaQcEtqBKIAvN3eeRgY+s4iLYDOR/MCnI8n4nxYFetkG8cZy1JsnhBoVZzeScYOcdu0DenSoc/fYLChY3bKNkgmwbxx8ao2KNVFVmUPuUKSrAjJ7LQu/Tt3PAzn6ZCXUKu43hTdE+hojE20+0f8AT9sHY+VIFcf+X0lkWRW2moVTvslksbh5WQFiTnaQ1jPGDWY6LR0mdxqahVADsYA2xvGKNCrJ78cyGtpPtZm0yq+DO0qBggV8DR9R/aXaNhtIHSRrVWC8F1UvljZHiF3YyKqjRkvHetxL0r6bpUdQS6ISTe5gKwaG3k8c2BmsmaX+ztMmk11N3QqyKFncQRQ5N1j61Hp11SFC9OjWqtu2E2N7lWJul3HcO1hQBwJkRW8bBV8JDOpxt8YFbSboMQpHaxLYkutC9IhP/dVR6na1481Agrf5TkUbPAMm6HToH79MkYoWOMkX8fkAZWNPU2CtKw4wwUkn8O7HlOMYF8+szt0zKQGRgWwu8Fc2OCaHwPYX84saxs/w9NxA1UKhbLigoJIAGTm8/Qe0o6fSRigd9gIbeedtXtNd/wCnk1z4hUkRxn7kEZFlWZcM1kMOaurs8D0udKvlvuQKsnwOAPGva6wQBXoTfeZnLKXj0sfptPcVTVBXbYYnYN1vfYnG1fDVncDgcWP0emFv+IWxd979Nov0+MzbHYMRpHxKVUqh2jxZYYNkeXnHvOoHCitEEEFlOxm8N83eQL79q5i8tJxWanSqCV+9Fi7awACDWzYTuvvfwIAJxJr0SZvqV712/Lzn4n6fTOoe9o0VsKcbWsADk2ewPfmxzic1NF/EzaW0EG7DIoA2+XcRkbboZNtzGrjuvoqqK66wYmvAB4hf5s4/vMu8+p+ss6libUoqEGzQKkY4onjvUhrEMxIXaDwLJrHqeZWa5vPqfrG8+p+sjUVAlvPqfrG8+p+sjUVAlvPqfrG8+p+sjUVAlvPqfrFyNRUCVxcjUVAlcXI1FQJXFyNRUCVxcjUVAlcXI1FQJXOTlRA7LXDbFJI22QB3BwTZrv79pVLHQbFbdZJYFfyjFH55/tAhpuVIYcg2MA0R3ozQev1KA3YGOBwQAV/pxxxKNJLIBIHOTXYE96FnjJHM0r0i+H+agsAnjHFg55z/AGPE1Jb4S8sZ31WN2b3Vd5JKilNnNgYv4mT/AIp7RgabTUKprsCSLvB5r2Almj06F0QuApFsx2gA7Sdt3QyNtmubqudn+GaQYA6+mwJSyuog2qzlWvcc0tNfYcgTNuVfLGn2hqLW1ytAAbAEwGZh5QOCxPuTKRrHx8ePDHvW4NQrABYA/KbtL7LVtijXQu+wBF8VO+61Yg0AtZbNX6UT0fZumbrqEoBTuJWm3Xe1N24beCCLJrgGxPkY89NVhVE4II+BBYj+7N9TO6/UO9b2LVxfa/8A1PQb7N0wLPUIx3AUhTy79pYkuAPCQw+dihc6PsrTN/8AU6I8VZIPJGQQfEtHn1B7WQ+S9vP0uqdfKxGAPkCSP7k/U+sP1TsSWayQQSQLotuq/wCrPwPE6ukp3kOoCi13BgX+AABo+5r4zX0v2arornUVAeWegoO5lC3fNLuPwdcVZlk2peWRjTqXU2GINVferJ592Of8x9ZMda4yHPFcDjHh+AwMdpr0/sxGTeOoSqJIYbWGaAYXak/7VYyM3V9KqbacMC7ruFbSF2U61fhO4jvlG9gvEnLepVOn1DrZViLsGj68+3vO63Uu42sxI5A4AxWAOMSOtphRh1bJGLrFeL1rPoDg4k+t0Qmo+mLpHZRfJCmg3bnn5xZhLcV62oXYuasmzQAHyAwJGIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICTbbtWvNZ3c5Hb4D5XIS1mGxRsognxfmycf89PjAqX9jNHTLpnzlxnlaoCuao3nH+8oXv7GDwPc/tBGvZoZO5xSih3LULztpc368j4gRRdLfp5bYSv3m7sLG7KgYq+M4lW4EbVGfCBiz3LfMk/QS062mFACW21bJNeIXZwcgmLy/C8vxlI9a+WR8vhE1NrpYrToYvxEmgTde+PpUfxCf/WO1Z7Bic1zYoX8PjJt9JrLEv0tZVLEoCCQReaAa9t/EYnX1ELJ4Nqg+MA3Y3cD5RprPFTVqayZCqRd5x+dWGO1AEfOdbqEPGmOSSSScFr4FcDEb+GskS4Otvg7SKUdx4gQT8aGfcyb66HdSZO/PpuYFa9qrHY/VozRO6jWzGqsk16WeJyVSIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgJYwbYtjw2SD6nAP6fr8ZXL3D7EJIKWaHcHN3/wA7/GBSvf2MHge5/aF7+xg8D3P7QNOn1TClCqxBWsG7VgQBRHcD39ybq1EagSMAACvQlqzzyCPhVdpEMQ1g0RZHyk1d2AQVmlApRwbAuvVj9Zd3ymenE6VyLCNWCMZIY7VKjlgTjFySdFqMQo03s1XhI5NDn1Ir3E19O2uCdjLYXTztSylAp4mH4RXPoBwBLn1eqDrps4D6hUC9oFs9i2Ax4ifnfOJZIz8u82POPRamf5b4waRiLuuQK5FSB6dxgowPoQQT4gtAHk2QKHrPaGr12H3mib3ApVsQdxr13A+xEwu+qWQFy7ahtATgE6pCkA+FSXS64A5+CyLLWN+ncUSjAG6JBAxd5PFbTfsZ3+Fe62NyRxiwdpzxg4ueqvQdSbDbV3nbbFRf85AwFeZdzAnBFMa5IMl6XrDWLveRlK84L2RgAtntY4xNfGfrPyvuPJbpHGNpxuuqathpidt4B78Tn8M/5T3wcHw1eOb8Qx8Z6Ov0/UaJfUZFXeHJyrCtwsr4jwWFXfzqZR1OofEHW6YnwgFfKMnbyaUCj6cTldnl1mWdM56dxyjj/Se04ukxG4Cx4jdjhAC1+lWPrPSbp+pO9q3WroxtfKjHdQxQsHkd8dpTraOqgO8qB48ttcsWADLYBO4gVniqsSatn5Wb+FerKMBnkbfKATz3yMSL9Oy8j44IbG1Xu1vG1lN/GXbNTVZlItgGdgQqt4VUMc0eFGB6XU26/wBn6/jJCKqWpYN4T93phdqkkk+BDn+q5uS2McuUleRE0dZ0T6RKuu0g0RYNGgawT2Ikv8Pcv90o3PSkgf5gpqz6FgP/AMjL4NmayxNT/ZzgG9ththAYEghWY2R4RhGxd44yI6X7PfUUugG0EgksqgbV3sTuIoBc3xGU+UZYnoj7D18eAZwPGlkjBFXzePfEz9P0D6illXwjkkhQBtL7juIpdoJ3HEZfRs9s0TSvRNvTTalbU2bchh/MrYSVvmx8jI9P0pcEggUyKQf85IB+RAHzkz6N+1ESxNAlkXu9V8zV/wDPScOnjdY4BA/EQSRgfK/YiF1CJqToXYbgVqr7+hNcc449pE9GwYqSoIr1zbBcUPUyfKJsZ4mpugcKWtaHPPZd15HpX196obTICmxTcfCjWYllNQiWnpzTG1NAnB5AYLYPpZx7GVSqREQEREB/z/lzf1/RoigprI53uu1SDSBmCvakjIAP+sehmCX9SE/AR5m/N5MbPN35gUp+xgnHzP7Qn7GCcfM/tAkTk/P9DNHTaAZCSBe6rzgEXuPwFf3mcnJ+f6GdLnYMnLNefgkJUy97VDtRoHdYAycYJsDn6yY0gTlxwpBLDkkAirux8PSd0Pu/xlr8OM15/FwD+Hj3+mfU242kk14vS+KH0v2IHYxeNzdT7X6yDeluGz5rvbbZPPqSfnzzJUbQ/eKCptc5U791jbdZJPPN1fJyXFyd+1xt+6P5ytWPE1cu9rZIz4LPxI94+6HA1h6Xu8PJ9GuvCDx3HMw3O3GX2Y2fcAizrJ3oFvbkWavF+3eZ9RdpoMCLrwnkCj6+v9x3le6LjKSNSZN72F2QWajQqiTfc3j/ACy7U6YuXJ1FcgFjmyaCi6B9h8hPPucuTKd+2rXvc9OXfO9wcMtWfFdn0jTyNx1CD4qG7NhMcsKseH5ATNc5u+MvZjY2gDg6qn1JNjCrVGySc1x+E/AStGLP5iSEwQc0unhbHwG2UXFx2Y09Mu4UX2jdkFq5GWonJ7X+vEjogsV099Ll+fCCU8R55obfl8pRcXHZjdpoTSjWAAJI8RFEIASM/lFXxQIxwaQmVTeNp22d1AWCOCewsX2HuAc9xcd+zGh9ybHVrIC+IG9rHdSjOKAv4fDElpptAA1FF7WofmAarzgizzWT25mW4uOzFulp+JQCAfNfpts+vOPUS0dKGJG9CRXzx+GzkAfSu0y3FxlMaH06KjepGATuwvioYu8czp0xY8e4ggUDnxH8Juj8rzXvM1xcYY1Ppc+I8E3Zr/uFLz2OTk+tyOjphiVZwAppST4aJyRf1r9JmuduMMam01APjBFZFi6Bc7av1VeOd19pJemQnzgC2HK8Ammq+DX9x2uY7i4y+zG3oelRtZNNmUoWQE3W6ytqMg2bIxmc6bQRgTyOQTY8PYkA4sgj6TGrkEEEgjIINEH1BhXI4JHsalhjgMTtzkKS/qNRG8q14mbgDB4UV2EoE1dXqOb3KF8bnv58bxkn4QMy9/YweB7n9oXv7GDwPc/tA6eT8/0MHyr/AFN+iQeT8/0MHyr/AFN+iQJ6TqHVnXcoILLdWPS5u0ur0TQbSZ2pVUXQxqs5wuWJVgnN4+mLQ1Sjq4AJUhgCLBrORPS0ftLUZSRpByjaYBAYhPG7KtZI3ZSwRgVk0ZrizUNLrunFg9Pd8ncNwy/BIOdrAdgSqmhQktfq+mrHSlcmrdxwwtb9RxY4+c43U6pCn+HQBSFB+6O695IpjZslSCfW+5zl6nRdgg+61F2KyZU5H3jsPwjILbT6kepltuf4kk3/AF1ep0wb+7sDypZIB3lssfMCtKbF47SR6nS7aZyDurF/zFYL32+Fdtj8xmdej1D+BxgmypVdq8sWagAPW4fotRSQdN8WPKSPCaNMMGjixJ8rnj+Fkt8/1e3VadPsTYSjAfiBJ1NNgCDdeFWHpmq9eL1abaZAXIa2oAFiRtwK2gAVQ+PrMz9O6+ZHXk5UjAIBOfQkD5j1kVQngX7ZPzA4mb35b49Tpq0tXS3OWQhdrBACSd3h2kmwLoHNcnjtOv1OnnahA8dDB86KBnnDKW+F4mc9M/5T3x38NXY5HmXnncK5g9M9sNpJXdurxVsrcTtugLFnjMnx1q3Omh+o0iWrSCjaduWJ3Y25utvrC9UpQhq3FnNBQBR0wg4oDNHH5b5lDdJqC709QVd2jYoAm8YwQfnIHReyu1twFkbTYAF2RyBWZZMZvLUIlr9M4vcjrV3uUrwu6s99ua5qVuhHP6juAQcdiCMwOREQEREBERAREQEREBERAREQEREBERATV1YevGwYb3FDgMDk1QAvn533mUTT1enWd4fxMPNZoEgNgnkC/mIGde/sYPA9z+0L39jB4Huf2gdPJ+f6GD5V/qb9Eg8n5/oYPlX+pv0SA7/L9pu+ydPXIc6HIZNw8O4kl9hG7sCCDX5s4usPf5ftNXQdOHDn71dMhkrcwXcCWthZGVoH59uZePlm+Ho6H8Xv3WpJZC5Ypt3DWdEDkZanRqCk0KrtKOp6jqUYuzKrG3IUo23bqNpmhmjuZlxdhjZIur9DpnO7SXqlJd0QBXBDhnZbWzeMMeMMee9Gr9mgMyHqUtSVIc7QLY2TuP8AlsgWQStivEN3cZlm/Szpz1OqFrUQ7yaRlG4k+FiFKVVEglcVuHqJXrfafU6T0zglWJ8qlGs7jRAHhPwrntJL0C4VurTYLBCuDRGQQCwBUkDI717iGp0StSnqUobqLOpW/vKvzWN27fdWaY1iT/r2v/Pr+MvWfaOpqedhWaUAUu4hjV5FkXd3z6mUaGuyElDRIo4BwfeWdT06oaDq4si0zgVn537YNE8ya9Mh8Q1FVaZhurd4TW0qDe480PhV5rFvtuT0p/iWoqSCDdggHzbbN8nKqf8ASJcPtLUtjuG5gQWrIDFCQvZfIOBjMP0ihSfvdMkA4U7jYIFCucnn0Fi+1Grp1TKG2MSELUCSoXdgem4Z/wBjTjy9LePtoX7U1QGG+93JIUnz77BqwQxJHpuNVcgftDU3M+7xMCGO1bIZVUjjilA+vcm80S7Wcnpe3WOfM1m3ayBYbUFMQRkX6cXmpD747t1KfDtAIsAbNgoHuBwfUA8yuJFnRERAREQEREBERAREQEREBERAREQEREBLuo2ZCfmajnyfhB3d+e3aUzR1OqjCkWjuY3QGCSQMenHy+OAoXv7GDwPc/tC9/YweB7n9oHTyfn+hg+Vf6m/RIPJ+f6GCfCB8W/uF/wBjAs6YKdRA9bCyhrO0bSRuthVCrzI6wXw7fQ36+ZqJFmjtqx2kkdO6nFWb9DnHaxj5fGWjW06AKZwTQ5NqWo3gUDWO4+N2TUtZCIEnqsp8q1z3vua+gofKQkUiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIATX1uo7DxLSlmYd8sSTR9Mk/H5TIJq6t3oBmDDc2AKphRNihXn47WeIGZe/sYPA9z+0L39jB4Huf2gdPmPxsD3OJd06t2S7K+97iB8rBvtj2nE03vcMGtwzmiCf0BNegPtLCXSyCuNpOAdux2UcjkMp4x7yyfd8Jb6E64j8AtlQW1m9gpXo4uhOdV1pflEXAHhFYHGPXtfpiZ2cmr7cdgM3gD3kZEnGS6REQ0REQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREAJq6tKHnL+IjkHsM4J9vlMol/Uqg8hs2fXihRyB3uBSvf2M09H0n3goGjvRB6Hfuv5jbfsG9JX0SqdRA9bCwDknaAhPiN2MgWfcDniQ1dMDbRBtFJ70SLKn0PwzXrAijnFEjuM8H1nWcnkk+lm5GICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAEv6jVRgAi0QSScCwQKtRxx2xzxdCien9scJ7n/wAVgYOmZAwLgsmbANE4NZx3qahqaFDwNdUck5rzeYWPhj3HfDEsWNOrqoVYKm0+DabLHAO6yTWSew7cDmWp1GiAl6ZLLsuzgkNb2LzY4/SYYg1uTX0fCSjbvCWqithrcBSaojAErTWQPpsUtV84rzUTTEEkHFeHAxXEyxJR6mr1XTZKI62bNojf/KjigTS+AMtAAHfRwIbqOmJWtFhb+MszABCxvaEbBqsUayM8zy4mcR6g6rpbF6L7BdLwa3MbLqwZiQV5sLtIHm3LF+o6baQukwYqwLMWYA70ZNo3jAUOt3fiHOZ5sSj1f4npbYnRc2XIptvme0G0NQ2r4cenB7YOoZCFKKFNtuA3EAeEKLYm+GPwvk9qYiBERKEREBERAREQEREBERAREQEREBERAREQEREBERA//9k='
          }
          height={100}
          width={300}
          onTrackerMove={(e) => console.log(e.currentTime)} // iOS only
          currentTime={this.video.currentTime} // use this prop to set tracker position iOS only
          themeColor={'white'} // iOS only
          thumbWidth={30} // iOS only
          trackerColor={'green'} // iOS only
          onChange={(e) => console.log(e.startTime, e.endTime)}
        />
      </View>
    );
  }
}
