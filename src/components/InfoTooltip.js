import InfotoltipSuccess from "../images/infotooltip-success.svg";
import InfotoltipFailure from "../images/infotooltip-failure.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="infotooltip">
        <img
          className="infotooltip__image"
          src={props.isSuccess ? InfotoltipSuccess : InfotoltipFailure}
          alt="Картинка регистрации"
        />
        <p className="infotooltip__paragraph">
          {props.isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button
          onClick={props.onClose}
          className="button button_type_close"
          type="button"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  );
}
export default InfoTooltip;
