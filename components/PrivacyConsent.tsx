import { Shield } from "lucide-react";

export default function PrivacyConsent() {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
      <div className="flex items-center gap-2 text-dama-blue-dark">
        <Shield size={18} />
        <h3 className="text-sm font-semibold uppercase tracking-wider">
          Aviso de Privacidad
        </h3>
      </div>
      <div className="mt-3 space-y-3 text-xs text-gray-600 leading-relaxed">
        <p>
          De conformidad con la <strong>Ley 81 de 26 de marzo de 2019</strong> y
          el <strong>Decreto Ejecutivo 285 de 28 de mayo de 2021</strong> sobre
          Protección de Datos Personales de Panamá, le informamos que:
        </p>
        <p>
          <strong>RESPONSABLE:</strong> DAMA Panamá (Capítulo afiliado a DAMA
          International)
        </p>
        <p>
          <strong>FINALIDAD:</strong> Gestionar su participación en el Grupo de
          Estudio DMBOK v2, incluyendo coordinación de sesiones, comunicación de
          materiales y seguimiento del programa.
        </p>
        <p>
          Sus datos NO serán transferidos a terceros sin su consentimiento
          expreso, excepto cuando sea requerido por ley.
        </p>
        <p>
          <strong>DERECHOS:</strong> Usted puede ejercer sus derechos de acceso,
          rectificación, cancelación y oposición (ARCO) enviando un correo a:{" "}
          <a
            href="mailto:privacidad@damapanama.org"
            className="text-dama-blue underline"
          >
            privacidad@damapanama.org
          </a>
        </p>
        <p>
          Los datos serán conservados mientras dure su participación en el grupo
          de estudio y hasta un máximo de <strong>7 años</strong> después de su
          última actividad.
        </p>
      </div>
    </div>
  );
}
